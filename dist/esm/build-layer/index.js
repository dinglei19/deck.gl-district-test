function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { Layer, project32, gouraudLighting, picking, COORDINATE_SYSTEM } from '@deck.gl/core';
import GL from '@luma.gl/constants';
import { Model, Geometry, hasFeature, FEATURES } from '@luma.gl/core';
import { setParameters } from '@luma.gl/gltools';
import PolygonTesselator from "./polygon-tesselator";
import getVertex from "./build-layer-vertex.glsl";
import getFragment from "./build-layer-fragment.glsl";
var DEFAULT_COLOR = [0, 0, 0, 255];
var defaultProps = {
  gradient: {
    type: 'array',
    value: [1, 1]
  },
  elevationScale: {
    type: 'number',
    min: 0,
    value: 1
  },
  getPolygon: {
    type: 'accessor',
    value: function value(f) {
      return f.polygon;
    }
  },
  // Accessor for extrusion height
  getElevation: {
    type: 'accessor',
    value: 1000
  },
  // Accessor for colors
  getFillColor: {
    type: 'accessor',
    value: DEFAULT_COLOR
  },
  material: true,
  opacity: {
    type: 'number',
    min: 0,
    value: 1
  }
};
var ATTRIBUTE_TRANSITION = {
  enter: function enter(value, chunk) {
    return chunk.length ? chunk.subarray(chunk.length - value.length) : value;
  }
};

var BuildLayer = /*#__PURE__*/function (_Layer) {
  _inherits(BuildLayer, _Layer);

  var _super = _createSuper(BuildLayer);

  function BuildLayer() {
    _classCallCheck(this, BuildLayer);

    return _super.apply(this, arguments);
  }

  _createClass(BuildLayer, [{
    key: "getShaders",
    value: function getShaders(type) {
      return _get(_getPrototypeOf(BuildLayer.prototype), "getShaders", this).call(this, {
        vs: getVertex(type),
        fs: getFragment(),
        defines: {},
        modules: [project32, gouraudLighting, picking]
      });
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      var _this = this;

      var _this$context = this.context,
          gl = _this$context.gl,
          viewport = _this$context.viewport;
      var coordinateSystem = this.props.coordinateSystem;

      if (viewport.isGeospatial && coordinateSystem === COORDINATE_SYSTEM.DEFAULT) {
        coordinateSystem = COORDINATE_SYSTEM.LNGLAT;
      }

      this.setState({
        numInstances: 0,
        polygonTesselator: new PolygonTesselator({
          fp64: this.use64bitPositions(),
          IndexType: !gl || hasFeature(gl, FEATURES.ELEMENT_INDEX_UINT32) ? Uint32Array : Uint16Array
        })
      });
      var attributeManager = this.getAttributeManager();
      var noAlloc = true;
      attributeManager.remove(['instancePickingColors']);
      attributeManager.add({
        indices: {
          size: 1,
          isIndexed: true,
          update: this.calculateIndices,
          noAlloc: noAlloc
        },
        positions: {
          size: 3,
          type: GL.DOUBLE,
          fp64: this.use64bitPositions(),
          transition: ATTRIBUTE_TRANSITION,
          accessor: 'getPolygon',
          update: this.calculatePositions,
          noAlloc: noAlloc,
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
          noAlloc: noAlloc
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
          accessor: function accessor(object, _ref) {
            var index = _ref.index,
                value = _ref.target;
            return _this.encodePickingColor(object && object.__source ? object.__source.index : index, value);
          },
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
    }
  }, {
    key: "getPickingInfo",
    value: function getPickingInfo(params) {
      var info = _get(_getPrototypeOf(BuildLayer.prototype), "getPickingInfo", this).call(this, params);

      var object = info.object,
          index = info.index;

      if (object && object.__source) {
        // data is wrapped
        info.object = this.props.data.find(function (d) {
          return d.__source.index === index;
        });
      }

      return info;
    }
  }, {
    key: "draw",
    value: function draw(_ref2) {
      var _setParameters;

      var uniforms = _ref2.uniforms;
      var elevationScale = this.props.elevationScale;
      var _this$state = this.state,
          topModel = _this$state.topModel,
          sideModel = _this$state.sideModel,
          polygonTesselator = _this$state.polygonTesselator,
          _this$state$show = _this$state.show,
          show = _this$state$show === void 0 ? true : _this$state$show;
      var gl = this.context.gl;

      var renderUniforms = _objectSpread(_objectSpread({}, uniforms), {}, {
        elevationScale: elevationScale
      });

      setParameters(gl, (_setParameters = {}, _defineProperty(_setParameters, gl.CULL_FACE, true), _defineProperty(_setParameters, gl.CULL_FACE_MODE, GL.BACK), _setParameters)); // Note: the order is important

      if (sideModel && show) {
        sideModel.setInstanceCount(polygonTesselator.instanceCount - 1);
        sideModel.setUniforms(renderUniforms).draw();
      }

      setParameters(gl, _defineProperty({}, gl.CULL_FACE_MODE, GL.BACK));

      if (topModel && show) {
        topModel.setVertexCount(polygonTesselator.vertexCount);
        topModel.setUniforms(renderUniforms).draw();
      }

      setParameters(gl, _defineProperty({}, gl.CULL_FACE, false));
    }
  }, {
    key: "updateState",
    value: function updateState(updateParams) {
      _get(_getPrototypeOf(BuildLayer.prototype), "updateState", this).call(this, updateParams);

      this.updateGeometry(updateParams);
      var props = updateParams.props,
          oldProps = updateParams.oldProps,
          changeFlags = updateParams.changeFlags;
      var attributeManager = this.getAttributeManager();
      var regenerateModels = changeFlags.extensionsChanged || props.filled !== oldProps.filled || props.extruded !== oldProps.extruded;

      if (regenerateModels) {
        if (this.state.models) {
          this.state.models.forEach(function (model) {
            return model.delete();
          });
        }

        this.setState(this._getModels(this.context.gl));
        attributeManager.invalidateAll();
      }
    }
  }, {
    key: "updateGeometry",
    value: function updateGeometry(_ref3) {
      var props = _ref3.props,
          changeFlags = _ref3.changeFlags;
      var geometryConfigChanged = changeFlags.dataChanged || changeFlags.updateTriggersChanged && (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getPolygon); // When the geometry config  or the data is changed,
      // tessellator needs to be invoked

      if (geometryConfigChanged) {
        var polygonTesselator = this.state.polygonTesselator;
        var buffers = props.data.attributes || {};
        polygonTesselator.updateGeometry({
          data: props.data,
          normalize: props._normalize,
          geometryBuffer: buffers.getPolygon,
          buffers: buffers,
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
  }, {
    key: "_getModels",
    value: function _getModels(gl) {
      var _this$props = this.props,
          id = _this$props.id,
          gradient = _this$props.gradient,
          opacity = _this$props.opacity;
      var sideShaders = this.getShaders('side');
      var sideModel = new Model(gl, _objectSpread(_objectSpread({}, sideShaders), {}, {
        id: "".concat(id, "-side"),
        geometry: new Geometry({
          drawMode: GL.TRIANGLE_FAN,
          attributes: {
            // top right - top left - bootom left - bottom right
            vertexPositions: {
              size: 2,
              value: new Float32Array([1, 1, 0, 1, 0, 0, 1, 0])
            }
          }
        }),
        uniforms: {
          gradient: gradient
        },
        instanceCount: 0,
        isInstanced: 1
      }));
      var topShaders = this.getShaders('top');
      var topModel = new Model(gl, _objectSpread(_objectSpread({}, topShaders), {}, {
        id: "".concat(id, "-top"),
        drawMode: GL.TRIANGLES,
        attributes: {
          vertexPositions: new Float32Array([0, 1])
        },
        uniforms: {
          gradient: gradient,
          opacity: opacity
        },
        isIndexed: true
      }));
      sideModel.userData.excludeAttributes = {
        indices: true
      };
      return {
        models: [sideModel, topModel],
        topModel: topModel,
        sideModel: sideModel
      };
    }
  }, {
    key: "calculateIndices",
    value: function calculateIndices(attribute) {
      var polygonTesselator = this.state.polygonTesselator;
      attribute.startIndices = polygonTesselator.indexStarts;
      attribute.value = polygonTesselator.get('indices');
    }
  }, {
    key: "calculatePositions",
    value: function calculatePositions(attribute) {
      var polygonTesselator = this.state.polygonTesselator;
      attribute.startIndices = polygonTesselator.vertexStarts;
      attribute.value = polygonTesselator.get('positions');
    }
  }, {
    key: "calculateVertexValid",
    value: function calculateVertexValid(attribute) {
      attribute.value = this.state.polygonTesselator.get('vertexValid');
    }
  }]);

  return BuildLayer;
}(Layer);

export { BuildLayer as default };
BuildLayer.layerName = 'BuildLayer';
BuildLayer.defaultProps = defaultProps;