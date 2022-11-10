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

import { Layer, project32, picking } from '@deck.gl/core';
import GL from '@luma.gl/constants';
import { Model, Geometry, hasFeature, FEATURES } from '@luma.gl/core';
import { setParameters } from '@luma.gl/gltools';
import { Texture2D } from '@luma.gl/webgl';
import PolygonTesselator from "../build-layer/polygon-tesselator";
import vs from "./light-side-layer-vertex.glsl";
import fs from "./light-side-layer-fragment.glsl";
var DEFAULT_COLOR = [0, 0, 0, 255];
var defaultProps = {
  getPolygon: {
    type: 'accessor',
    value: function value(f) {
      return f.polygon;
    }
  },
  // Accessor for extrusion height
  getElevation: {
    type: 'accessor',
    value: 0
  },
  // Accessor for colors
  getFillColor: {
    type: 'accessor',
    value: DEFAULT_COLOR
  },
  //动画持续时间
  getSpeed: {
    type: 'accessor',
    value: 0
  }
};
var ATTRIBUTE_TRANSITION = {
  enter: function enter(value, chunk) {
    return chunk.length ? chunk.subarray(chunk.length - value.length) : value;
  }
};

var LightSideLayer = /*#__PURE__*/function (_Layer) {
  _inherits(LightSideLayer, _Layer);

  var _super = _createSuper(LightSideLayer);

  function LightSideLayer() {
    _classCallCheck(this, LightSideLayer);

    return _super.apply(this, arguments);
  }

  _createClass(LightSideLayer, [{
    key: "getShaders",
    value: function getShaders() {
      return _get(_getPrototypeOf(LightSideLayer.prototype), "getShaders", this).call(this, {
        vs: vs,
        fs: fs,
        defines: {},
        modules: [project32, picking]
      });
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      var _this = this;

      var texture = this.props.texture;
      var gl = this.context.gl;
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
            return _this.encodePickingColor(index, value);
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
      attributeManager.addInstanced({
        instanceSpeed: {
          size: 1,
          transition: true,
          accessor: 'getSpeed',
          defaultValue: 0
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(_ref2) {
      var uniforms = _ref2.uniforms,
          context = _ref2.context;
      var _this$state = this.state,
          polygonTesselator = _this$state.polygonTesselator,
          model = _this$state.model;
      model.setInstanceCount(polygonTesselator.instanceCount - 1);
      model.setUniforms(Object.assign({}, uniforms, {
        currentTime: context.timeline.time
      })).draw();
    }
  }, {
    key: "updateState",
    value: function updateState(_ref3) {
      var props = _ref3.props,
          oldProps = _ref3.oldProps,
          changeFlags = _ref3.changeFlags;

      _get(_getPrototypeOf(LightSideLayer.prototype), "updateState", this).call(this, {
        props: props,
        oldProps: oldProps,
        changeFlags: changeFlags
      });

      this.updateGeometry({
        props: props,
        oldProps: oldProps,
        changeFlags: changeFlags
      });

      if (changeFlags.extensionsChanged) {
        var gl = this.context.gl;

        if (this.state.model) {
          this.state.model.delete();
        }

        this.setState({
          model: this._getModel(gl)
        });
        this.getAttributeManager().invalidateAll();
      }
    }
  }, {
    key: "updateGeometry",
    value: function updateGeometry(_ref4) {
      var props = _ref4.props,
          changeFlags = _ref4.changeFlags;
      var geometryConfigChanged = changeFlags.dataChanged || changeFlags.updateTriggersChanged && (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getPolygon);

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
    key: "_getModel",
    value: function _getModel(gl) {
      var _this$props = this.props,
          texture = _this$props.texture,
          _this$props$animate = _this$props.animate,
          animate = _this$props$animate === void 0 ? false : _this$props$animate,
          _this$props$baseRatio = _this$props.baseRatio,
          baseRatio = _this$props$baseRatio === void 0 ? 0 : _this$props$baseRatio,
          _this$props$topRatio = _this$props.topRatio,
          topRatio = _this$props$topRatio === void 0 ? 1 : _this$props$topRatio;
      var sideTexture = {};

      if (texture) {
        var _parameters;

        var atexture = new Texture2D(gl, {
          data: texture.material,
          parameters: (_parameters = {}, _defineProperty(_parameters, GL.TEXTURE_MAG_FILTER, GL.NEAREST), _defineProperty(_parameters, GL.TEXTURE_MIN_FILTER, GL.NEAREST), _defineProperty(_parameters, GL.TEXTURE_WRAP_S, GL.REPEAT), _defineProperty(_parameters, GL.TEXTURE_WRAP_T, GL.REPEAT), _parameters),
          pixelStore: _defineProperty({}, GL.UNPACK_FLIP_Y_WEBGL, true),
          mipmaps: true
        });
        sideTexture = {
          x: texture.x,
          y: texture.y,
          uTexture: atexture
        };
      }

      var sideModel = new Model(gl, Object.assign({}, this.getShaders(), {
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
        uniforms: _objectSpread({
          isTexture: texture ? true : false,
          animate: animate,
          baseRatio: baseRatio,
          topRatio: topRatio
        }, sideTexture),
        instanceCount: 0,
        isInstanced: 1
      }));
      sideModel.userData.excludeAttributes = {
        indices: true
      };
      return sideModel;
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

  return LightSideLayer;
}(Layer);

export { LightSideLayer as default };
LightSideLayer.layerName = 'LightSideLayer';
LightSideLayer.defaultProps = defaultProps;