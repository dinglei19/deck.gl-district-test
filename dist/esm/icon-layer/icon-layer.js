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

// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import { Layer, project32, picking } from '@deck.gl/core';
import GL from '@luma.gl/constants';
import { Model, Geometry } from '@luma.gl/core';
import vs from "./icon-layer-vertex.glsl";
import fs from "./icon-layer-fragment.glsl";
import IconManager from "./icon-manager";
var DEFAULT_COLOR = [0, 0, 0, 255];
/*
 * @param {object} props
 * @param {Texture2D | string} props.iconAtlas - atlas image url or texture
 * @param {object} props.iconMapping - icon names mapped to icon definitions
 * @param {object} props.iconMapping[icon_name].x - x position of icon on the atlas image
 * @param {object} props.iconMapping[icon_name].y - y position of icon on the atlas image
 * @param {object} props.iconMapping[icon_name].width - width of icon on the atlas image
 * @param {object} props.iconMapping[icon_name].height - height of icon on the atlas image
 * @param {object} props.iconMapping[icon_name].anchorX - x anchor of icon on the atlas image,
 *   default to width / 2
 * @param {object} props.iconMapping[icon_name].anchorY - y anchor of icon on the atlas image,
 *   default to height / 2
 * @param {object} props.iconMapping[icon_name].mask - whether icon is treated as a transparency
 *   mask. If true, user defined color is applied. If false, original color from the image is
 *   applied. Default to false.
 * @param {number} props.size - icon size in pixels
 * @param {func} props.getPosition - returns anchor position of the icon, in [lng, lat, z]
 * @param {func} props.getIcon - returns icon name as a string
 * @param {func} props.getSize - returns icon size multiplier as a number
 * @param {func} props.getColor - returns color of the icon in [r, g, b, a]. Only works on icons
 *   with mask: true.
 * @param {func} props.getAngle - returns rotating angle (in degree) of the icon.
 */

var defaultProps = {
  iconAtlas: {
    type: 'object',
    value: null,
    async: true
  },
  iconMapping: {
    type: 'object',
    value: {},
    async: true
  },
  sizeScale: {
    type: 'number',
    value: 1,
    min: 0
  },
  billboard: true,
  sizeUnits: 'pixels',
  sizeMinPixels: {
    type: 'number',
    min: 0,
    value: 0
  },
  //  min point radius in pixels
  sizeMaxPixels: {
    type: 'number',
    min: 0,
    value: Number.MAX_SAFE_INTEGER
  },
  // max point radius in pixels
  alphaCutoff: {
    type: 'number',
    value: 0.05,
    min: 0,
    max: 1
  },
  getPosition: {
    type: 'accessor',
    value: function value(x) {
      return x.position;
    }
  },
  getIcon: {
    type: 'accessor',
    value: function value(x) {
      return x.icon;
    }
  },
  getColor: {
    type: 'accessor',
    value: DEFAULT_COLOR
  },
  getSize: {
    type: 'accessor',
    value: 1
  },
  getAngle: {
    type: 'accessor',
    value: 0
  }
};

var IconLayer = /*#__PURE__*/function (_Layer) {
  _inherits(IconLayer, _Layer);

  var _super = _createSuper(IconLayer);

  function IconLayer() {
    _classCallCheck(this, IconLayer);

    return _super.apply(this, arguments);
  }

  _createClass(IconLayer, [{
    key: "getShaders",
    value: function getShaders() {
      return _get(_getPrototypeOf(IconLayer.prototype), "getShaders", this).call(this, {
        vs: vs,
        fs: fs,
        modules: [project32, picking]
      });
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      var _this = this;

      this.state = {
        iconManager: new IconManager(this.context.gl, {
          onUpdate: function onUpdate() {
            return _this._onUpdate();
          }
        })
      };
      var attributeManager = this.getAttributeManager();
      /* eslint-disable max-len */

      attributeManager.addInstanced({
        instancePositions: {
          size: 3,
          type: GL.DOUBLE,
          fp64: this.use64bitPositions(),
          transition: true,
          accessor: 'getPosition'
        },
        instanceSizes: {
          size: 1,
          transition: true,
          accessor: 'getSize',
          defaultValue: 1
        },
        instanceOffsets: {
          size: 2,
          accessor: 'getIcon',
          transform: this.getInstanceOffset
        },
        instanceIconFrames: {
          size: 4,
          accessor: 'getIcon',
          transform: this.getInstanceIconFrame
        },
        instanceColorModes: {
          size: 1,
          type: GL.UNSIGNED_BYTE,
          accessor: 'getIcon',
          transform: this.getInstanceColorMode
        },
        instanceColors: {
          size: this.props.colorFormat.length,
          type: GL.UNSIGNED_BYTE,
          normalized: true,
          transition: true,
          accessor: 'getColor',
          defaultValue: DEFAULT_COLOR
        },
        instanceAngles: {
          size: 1,
          transition: true,
          accessor: 'getAngle',
          defaultValue: 0
        }
      });
      /* eslint-enable max-len */
    }
    /* eslint-disable max-statements, complexity */

  }, {
    key: "updateState",
    value: function updateState(_ref) {
      var oldProps = _ref.oldProps,
          props = _ref.props,
          changeFlags = _ref.changeFlags;

      _get(_getPrototypeOf(IconLayer.prototype), "updateState", this).call(this, {
        props: props,
        oldProps: oldProps,
        changeFlags: changeFlags
      });

      var attributeManager = this.getAttributeManager();
      var iconManager = this.state.iconManager;
      var iconAtlas = props.iconAtlas,
          iconMapping = props.iconMapping,
          data = props.data,
          getIcon = props.getIcon;
      var iconMappingChanged = false;
      var prePacked = iconAtlas || this.internalState.isAsyncPropLoading('iconAtlas'); // prepacked iconAtlas from user

      if (prePacked) {
        if (oldProps.iconAtlas !== props.iconAtlas) {
          iconManager.setProps({
            iconAtlas: iconAtlas,
            autoPacking: false
          });
        }

        if (oldProps.iconMapping !== props.iconMapping) {
          iconManager.setProps({
            iconMapping: iconMapping
          });
          iconMappingChanged = true;
        }
      } else {
        // otherwise, use autoPacking
        iconManager.setProps({
          autoPacking: true
        });
      }

      if (changeFlags.dataChanged || changeFlags.updateTriggersChanged && (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getIcon)) {
        iconManager.setProps({
          data: data,
          getIcon: getIcon
        });
        iconMappingChanged = true;
      }

      if (iconMappingChanged) {
        attributeManager.invalidate('instanceOffsets');
        attributeManager.invalidate('instanceIconFrames');
        attributeManager.invalidate('instanceColorModes');
      }

      if (changeFlags.extensionsChanged) {
        var gl = this.context.gl;

        if (this.state.model) {
          this.state.model.delete();
        }

        this.setState({
          model: this._getModel(gl)
        });
        attributeManager.invalidateAll();
      }
    }
    /* eslint-enable max-statements, complexity */

  }, {
    key: "finalizeState",
    value: function finalizeState() {
      _get(_getPrototypeOf(IconLayer.prototype), "finalizeState", this).call(this); // Release resources held by the icon manager


      this.state.iconManager.finalize();
    }
  }, {
    key: "draw",
    value: function draw(_ref2) {
      var uniforms = _ref2.uniforms;
      var _this$props = this.props,
          sizeScale = _this$props.sizeScale,
          sizeMinPixels = _this$props.sizeMinPixels,
          sizeMaxPixels = _this$props.sizeMaxPixels,
          sizeUnits = _this$props.sizeUnits,
          billboard = _this$props.billboard,
          _this$props$isBearing = _this$props.isBearing,
          isBearing = _this$props$isBearing === void 0 ? true : _this$props$isBearing,
          alphaCutoff = _this$props.alphaCutoff;
      var _this$state = this.state,
          iconManager = _this$state.iconManager,
          _this$state$show = _this$state.show,
          show = _this$state$show === void 0 ? true : _this$state$show;
      var viewport = this.context.viewport;
      var iconsTexture = iconManager.getTexture();

      if (iconsTexture && iconsTexture.loaded) {
        if (show) {
          this.state.model.setUniforms(_objectSpread(_objectSpread({}, uniforms), {}, {
            iconsTexture: iconsTexture,
            iconsTextureDim: [iconsTexture.width, iconsTexture.height],
            sizeScale: sizeScale * (sizeUnits === 'pixels' ? viewport.metersPerPixel : 1),
            sizeMinPixels: sizeMinPixels,
            sizeMaxPixels: sizeMaxPixels,
            billboard: billboard,
            alphaCutoff: alphaCutoff,
            isBearing: isBearing,
            bearing: viewport.bearing
          })).draw();
        }
      }
    }
  }, {
    key: "_getModel",
    value: function _getModel(gl) {
      // The icon-layer vertex shader uses 2d positions
      // specifed via: attribute vec2 positions;
      var positions = [-1, -1, -1, 1, 1, 1, 1, -1];
      return new Model(gl, _objectSpread(_objectSpread({}, this.getShaders()), {}, {
        id: this.props.id,
        geometry: new Geometry({
          drawMode: GL.TRIANGLE_FAN,
          attributes: {
            // The size must be explicitly passed here otherwise luma.gl
            // will default to assuming that positions are 3D (x,y,z)
            positions: {
              size: 2,
              value: new Float32Array(positions)
            }
          }
        }),
        isInstanced: true
      }));
    }
  }, {
    key: "_onUpdate",
    value: function _onUpdate() {
      this.setNeedsRedraw();
    }
  }, {
    key: "getInstanceOffset",
    value: function getInstanceOffset(icon) {
      var rect = this.state.iconManager.getIconMapping(icon);
      return [rect.width / 2 - rect.anchorX || 0, rect.height / 2 - rect.anchorY || 0];
    }
  }, {
    key: "getInstanceColorMode",
    value: function getInstanceColorMode(icon) {
      var mapping = this.state.iconManager.getIconMapping(icon);
      return mapping.mask ? 1 : 0;
    }
  }, {
    key: "getInstanceIconFrame",
    value: function getInstanceIconFrame(icon) {
      var rect = this.state.iconManager.getIconMapping(icon);
      return [rect.x || 0, rect.y || 0, rect.width || 0, rect.height || 0];
    }
  }]);

  return IconLayer;
}(Layer);

export { IconLayer as default };
IconLayer.layerName = 'IconLayer';
IconLayer.defaultProps = defaultProps;