function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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
import { Model, Geometry } from '@luma.gl/core';
import vs from "./scatterplot-layer-vertex.glsl";
import fs from "./scatterplot-layer-fragment.glsl";
var DEFAULT_COLOR = [0, 0, 0, 255];
var defaultProps = {
  radiusScale: {
    type: 'number',
    min: 0,
    value: 1
  },
  radiusMinPixels: {
    type: 'number',
    min: 0,
    value: 0
  },
  //  min point radius in pixels
  radiusMaxPixels: {
    type: 'number',
    min: 0,
    value: Number.MAX_SAFE_INTEGER
  },
  // max point radius in pixels
  lineWidthUnits: 'meters',
  lineWidthScale: {
    type: 'number',
    min: 0,
    value: 1
  },
  lineWidthMinPixels: {
    type: 'number',
    min: 0,
    value: 0
  },
  lineWidthMaxPixels: {
    type: 'number',
    min: 0,
    value: Number.MAX_SAFE_INTEGER
  },
  stroked: false,
  filled: true,
  getPosition: {
    type: 'accessor',
    value: function value(x) {
      return x.position;
    }
  },
  getRadius: {
    type: 'accessor',
    value: 1
  },
  getFillColor: {
    type: 'accessor',
    value: DEFAULT_COLOR
  },
  getLineColor: {
    type: 'accessor',
    value: DEFAULT_COLOR
  },
  getLineWidth: {
    type: 'accessor',
    value: 1
  },
  // deprecated
  strokeWidth: {
    deprecatedFor: 'getLineWidth'
  },
  outline: {
    deprecatedFor: 'stroked'
  },
  getColor: {
    deprecatedFor: ['getFillColor', 'getLineColor']
  }
};

var ScatterplotLayer = /*#__PURE__*/function (_Layer) {
  _inherits(ScatterplotLayer, _Layer);

  var _super = _createSuper(ScatterplotLayer);

  function ScatterplotLayer() {
    _classCallCheck(this, ScatterplotLayer);

    return _super.apply(this, arguments);
  }

  _createClass(ScatterplotLayer, [{
    key: "getShaders",
    value: function getShaders(id) {
      return _get(_getPrototypeOf(ScatterplotLayer.prototype), "getShaders", this).call(this, {
        vs: vs,
        fs: fs,
        modules: [project32, picking]
      });
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      this.getAttributeManager().addInstanced({
        instancePositions: {
          size: 3,
          type: GL.DOUBLE,
          fp64: this.use64bitPositions(),
          transition: true,
          accessor: 'getPosition'
        },
        instanceRadius: {
          size: 1,
          transition: true,
          accessor: 'getRadius',
          defaultValue: 1
        },
        instanceFillColors: {
          size: this.props.colorFormat.length,
          transition: true,
          normalized: true,
          type: GL.UNSIGNED_BYTE,
          accessor: 'getFillColor',
          defaultValue: [0, 0, 0, 255]
        },
        instanceLineColors: {
          size: this.props.colorFormat.length,
          transition: true,
          normalized: true,
          type: GL.UNSIGNED_BYTE,
          accessor: 'getLineColor',
          defaultValue: [0, 0, 0, 255]
        },
        instanceLineWidths: {
          size: 1,
          transition: true,
          accessor: 'getLineWidth',
          defaultValue: 1
        }
      });
    }
  }, {
    key: "updateState",
    value: function updateState(_ref) {
      var props = _ref.props,
          oldProps = _ref.oldProps,
          changeFlags = _ref.changeFlags;

      _get(_getPrototypeOf(ScatterplotLayer.prototype), "updateState", this).call(this, {
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
    key: "draw",
    value: function draw(_ref2) {
      var uniforms = _ref2.uniforms;
      var viewport = this.context.viewport;
      var _this$state$show = this.state.show,
          show = _this$state$show === void 0 ? true : _this$state$show;
      var _this$props = this.props,
          radiusScale = _this$props.radiusScale,
          radiusMinPixels = _this$props.radiusMinPixels,
          radiusMaxPixels = _this$props.radiusMaxPixels,
          stroked = _this$props.stroked,
          filled = _this$props.filled,
          lineWidthUnits = _this$props.lineWidthUnits,
          lineWidthScale = _this$props.lineWidthScale,
          lineWidthMinPixels = _this$props.lineWidthMinPixels,
          lineWidthMaxPixels = _this$props.lineWidthMaxPixels,
          _this$props$duration = _this$props.duration,
          duration = _this$props$duration === void 0 ? 0 : _this$props$duration;
      var time = this.context.timeline.time;
      var widthMultiplier = lineWidthUnits === 'pixels' ? viewport.metersPerPixel : 1;
      show && this.state.model.setUniforms(uniforms).setUniforms({
        stroked: stroked ? 1 : 0,
        filled: filled,
        radiusScale: radiusScale,
        radiusMinPixels: radiusMinPixels,
        radiusMaxPixels: radiusMaxPixels,
        lineWidthScale: lineWidthScale * widthMultiplier,
        lineWidthMinPixels: lineWidthMinPixels,
        lineWidthMaxPixels: lineWidthMaxPixels,
        currentTime: duration ? time % duration / duration : 0
      }).draw();
    }
  }, {
    key: "_getModel",
    value: function _getModel(gl) {
      // a square that minimally cover the unit circle
      var positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0];
      return new Model(gl, Object.assign(this.getShaders(), {
        id: this.props.id,
        geometry: new Geometry({
          drawMode: GL.TRIANGLE_FAN,
          vertexCount: 4,
          attributes: {
            positions: {
              size: 3,
              value: new Float32Array(positions)
            }
          }
        }),
        isInstanced: true
      }));
    }
  }]);

  return ScatterplotLayer;
}(Layer);

export { ScatterplotLayer as default };
ScatterplotLayer.layerName = 'ScatterplotLayer';
ScatterplotLayer.defaultProps = defaultProps;