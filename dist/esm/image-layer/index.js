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

import { Layer, project } from '@deck.gl/core';
import { Model, Geometry } from '@luma.gl/engine';
import { Texture2D } from '@luma.gl/webgl';
import GL from '@luma.gl/constants';
import vs from "./image-layer-vertext.glsl";
import fs from "./image-layer-fragment.glsl";

var ImageLayer = /*#__PURE__*/function (_Layer) {
  _inherits(ImageLayer, _Layer);

  var _super = _createSuper(ImageLayer);

  function ImageLayer() {
    _classCallCheck(this, ImageLayer);

    return _super.apply(this, arguments);
  }

  _createClass(ImageLayer, [{
    key: "getShaders",
    value: function getShaders() {
      return _get(_getPrototypeOf(ImageLayer.prototype), "getShaders", this).call(this, {
        vs: vs,
        fs: fs,
        modules: [project]
      });
    }
  }, {
    key: "initializeState",
    value: function initializeState() {}
  }, {
    key: "draw",
    value: function draw() {
      var _this$state = this.state,
          model = _this$state.model,
          _this$state$show = _this$state.show,
          show = _this$state$show === void 0 ? true : _this$state$show;

      if (show) {
        model.draw();
      }
    }
  }, {
    key: "updateState",
    value: function updateState(_ref) {
      var props = _ref.props,
          oldProps = _ref.oldProps,
          changeFlags = _ref.changeFlags;

      _get(_getPrototypeOf(ImageLayer.prototype), "updateState", this).call(this, {
        props: props,
        oldProps: oldProps,
        changeFlags: changeFlags
      });

      if (changeFlags.extensionsChanged) {
        var gl = this.context.gl;
        this.setState({
          model: this._getModel(gl)
        });
        this.getAttributeManager().invalidateAll();
      }
    }
  }, {
    key: "_getModel",
    value: function _getModel(gl) {
      var _parameters;

      var _this$props = this.props,
          texture = _this$props.texture,
          _this$props$coordinat = _this$props.coordinates,
          coordinates = _this$props$coordinat === void 0 ? [45.00, 65.0, 165.00, 65.0, 165.0, 0.0, 45.0, 0.0] : _this$props$coordinat;
      var textureTmp = new Texture2D(gl, {
        data: texture,
        parameters: (_parameters = {}, _defineProperty(_parameters, GL.TEXTURE_MAG_FILTER, GL.LINEAR), _defineProperty(_parameters, GL.TEXTURE_MIN_FILTER, GL.LINEAR), _defineProperty(_parameters, GL.TEXTURE_WRAP_S, GL.REPEAT), _defineProperty(_parameters, GL.TEXTURE_WRAP_T, GL.REPEAT), _parameters),
        pixelStore: _defineProperty({}, GL.UNPACK_FLIP_Y_WEBGL, true),
        mipmaps: true
      });
      return new Model(gl, _objectSpread(_objectSpread({}, this.getShaders()), {}, {
        geometry: new Geometry({
          indices: {
            size: 1,
            value: new Uint16Array([0, 1, 2, 2, 3, 0])
          },
          attributes: {
            positions: {
              size: 2,
              value: new Float32Array(coordinates)
            },
            uv: {
              size: 2,
              value: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])
            }
          }
        }),
        uniforms: {
          texture: textureTmp
        }
      }));
    }
  }]);

  return ImageLayer;
}(Layer);

export { ImageLayer as default };
ImageLayer.layerName = 'ImageLayer';