import { Layer, project32, picking } from '@deck.gl/core';
import GL from '@luma.gl/constants';
import { Model, Geometry, hasFeature, FEATURES } from '@luma.gl/core';
import { setParameters } from '@luma.gl/gltools';
import { Texture2D } from '@luma.gl/webgl';
import PolygonTesselator from '../build-layer/polygon-tesselator';

import vs from './light-side-layer-vertex.glsl';
import fs from './light-side-layer-fragment.glsl';


const DEFAULT_COLOR = [0, 0, 0, 255];

const defaultProps = {
  getPolygon: { type: 'accessor', value: f => f.polygon },
  // Accessor for extrusion height
  getElevation: { type: 'accessor', value: 0 },
  // Accessor for colors
  getFillColor: { type: 'accessor', value: DEFAULT_COLOR },
  //动画持续时间
  getSpeed: { type: 'accessor', value: 0 },
};

const ATTRIBUTE_TRANSITION = {
  enter: (value, chunk) => {
    return chunk.length ? chunk.subarray(chunk.length - value.length) : value;
  }
};

export default class LightSideLayer extends Layer {
  getShaders () {
    return super.getShaders({ vs, fs, defines: {}, modules: [project32, picking] });
  }
  initializeState () {
    const { texture } = this.props;
    const { gl } = this.context;
    setParameters(gl, {
      depthTest: false
    });
    this.setState({
      currentTime: 0,
      numInstances: 0,
      polygonTesselator: new PolygonTesselator({
        fp64: this.use64bitPositions(),
        IndexType: !gl || hasFeature(gl, FEATURES.ELEMENT_INDEX_UINT32) ? Uint32Array : Uint16Array
      })
    });

    const attributeManager = this.getAttributeManager();
    const noAlloc = true;

    attributeManager.remove(['instancePickingColors']);
    attributeManager.add({
      indices: {
        size: 1,
        isIndexed: true,
        update: this.calculateIndices,
        noAlloc
      },
      positions: {
        size: 3,
        type: GL.DOUBLE,
        fp64: this.use64bitPositions(),
        transition: ATTRIBUTE_TRANSITION,
        accessor: 'getPolygon',
        update: this.calculatePositions,
        noAlloc,
        shaderAttributes: {
          positions: {
            vertexOffset: 0,
            divisor: 0
          },
          instancePositions: {
            vertexOffset: 0,
            divisor: 1
          },
          nextPositions: {
            vertexOffset: 1,
            divisor: 1
          }
        }
      },
      vertexValid: {
        size: 1,
        divisor: 1,
        type: GL.UNSIGNED_BYTE,
        update: this.calculateVertexValid,
        noAlloc
      },
      elevations: {
        size: 1,
        transition: ATTRIBUTE_TRANSITION,
        accessor: 'getElevation',
        shaderAttributes: {
          elevations: {
            divisor: 0
          },
          instanceElevations: {
            divisor: 1
          }
        }
      },
      fillColors: {
        alias: 'colors',
        size: this.props.colorFormat.length,
        type: GL.UNSIGNED_BYTE,
        normalized: true,
        transition: ATTRIBUTE_TRANSITION,
        accessor: 'getFillColor',
        defaultValue: DEFAULT_COLOR,
        shaderAttributes: {
          fillColors: {
            divisor: 0
          },
          instanceFillColors: {
            divisor: 1
          }
        }
      },
      pickingColors: {
        size: 3,
        type: GL.UNSIGNED_BYTE,
        accessor: (object, { index, target: value }) => this.encodePickingColor(index, value),
        shaderAttributes: {
          pickingColors: {
            divisor: 0
          },
          instancePickingColors: {
            divisor: 1
          }
        }
      }
    });
    attributeManager.addInstanced({
      instanceSpeed: {
        size: 1,
        transition: true,
        accessor: 'getSpeed',
        defaultValue: 0
      }
    });
  }

  draw ({ uniforms,context }) {
    const { polygonTesselator, model } = this.state;
    model.setInstanceCount(polygonTesselator.instanceCount - 1);
    model.setUniforms(
            Object.assign({}, uniforms, {
              currentTime: context.timeline.time
            })
    ).draw();
  }

  updateState ({ props, oldProps, changeFlags }) {
    super.updateState({ props, oldProps, changeFlags });
    this.updateGeometry({ props, oldProps, changeFlags });

    if (changeFlags.extensionsChanged) {
      const { gl } = this.context;
      if (this.state.model) {
        this.state.model.delete();
      }
      this.setState({ model: this._getModel(gl) });
      this.getAttributeManager().invalidateAll();
    }
  }
  updateGeometry ({ props, changeFlags }) {
    
    const geometryConfigChanged =
            changeFlags.dataChanged ||
            (changeFlags.updateTriggersChanged &&
                (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getPolygon));

    if (geometryConfigChanged) {
      const { polygonTesselator } = this.state;
      const buffers = props.data.attributes || {};
      polygonTesselator.updateGeometry({
        data: props.data,
        normalize: props._normalize,
        geometryBuffer: buffers.getPolygon,
        buffers,
        getGeometry: props.getPolygon,
        positionFormat: props.positionFormat,
        fp64: this.use64bitPositions(),
        dataChanged: changeFlags.dataChanged
      });

      this.setState({
        numInstances: polygonTesselator.instanceCount,
        startIndices: polygonTesselator.vertexStarts
      });

      if (!changeFlags.dataChanged) {
        this.getAttributeManager().invalidateAll();
      }
    }
  }

  _getModel (gl) {
    const { texture, animate = false, baseRatio = 0, topRatio = 1 } = this.props;
    let sideTexture = {};
    if (texture) {
      let atexture = new Texture2D(gl, {
        data: texture.material,
        parameters: {
          [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
          [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
          [GL.TEXTURE_WRAP_S]: GL.REPEAT,
          [GL.TEXTURE_WRAP_T]: GL.REPEAT,
        },
        pixelStore: {
          [GL.UNPACK_FLIP_Y_WEBGL]: true,
        },
        mipmaps: true
      });
      sideTexture = {
        x: texture.x,
        y: texture.y,
        uTexture: atexture
      };
    }
    let sideModel = new Model(
            gl,
            Object.assign({}, this.getShaders(), {
              id: this.props.id,
              geometry: new Geometry({
                drawMode: GL.TRIANGLE_FAN,
                vertexCount: 4,
                attributes: {
                  // top right - top left - bootom left - bottom right
                  vertexPositions: {
                    size: 3,
                    value: new Float32Array([1, 1, topRatio, 0, 1, topRatio, 0, 0, baseRatio, 1, 0, baseRatio])
                  }
                }
              }),
              uniforms: {
                isTexture: texture ? true : false,
                animate,
                baseRatio,
                topRatio,
                ...sideTexture
              },
              instanceCount: 0,
              isInstanced: 1
            })
    );
    sideModel.userData.excludeAttributes = { indices: true };
    return sideModel;
  }

  calculateIndices (attribute) {
    const { polygonTesselator } = this.state;
    attribute.startIndices = polygonTesselator.indexStarts;
    attribute.value = polygonTesselator.get('indices');
  }

  calculatePositions (attribute) {
    const { polygonTesselator } = this.state;
    attribute.startIndices = polygonTesselator.vertexStarts;
    attribute.value = polygonTesselator.get('positions');
  }

  calculateVertexValid (attribute) {
    attribute.value = this.state.polygonTesselator.get('vertexValid');
  }
}

LightSideLayer.layerName = 'LightSideLayer';
LightSideLayer.defaultProps = defaultProps;