function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
import { createIterable } from '@deck.gl/core';
import GL from '@luma.gl/constants';
import IconLayer from "../../icon-layer/icon-layer";
import vs from "./multi-icon-layer-vertex.glsl";
import fs from "./multi-icon-layer-fragment.glsl"; // TODO expose as layer properties

var DEFAULT_GAMMA = 0.2;
var DEFAULT_BUFFER = 192.0 / 256;
var defaultProps = {
  backgroundColor: {
    type: 'color',
    value: null,
    optional: true
  },
  // each paragraph can have one or multiple row(s)
  // each row can have one or multiple character(s)
  getRowSize: {
    type: 'accessor',
    value: function value(x) {
      return x.rowSize || [0, 0];
    }
  },
  // offset from the left, top position of the paragraph
  getOffsets: {
    type: 'accessor',
    value: function value(x) {
      return x.offsets || [0, 0];
    }
  },
  // [width, height] of the paragraph
  getParagraphSize: {
    type: 'accessor',
    value: function value(x) {
      return x.size || [1, 1];
    }
  },
  // 1: left, 0: middle, -1: right
  getAnchorX: {
    type: 'accessor',
    value: function value(x) {
      return x.anchorX || 0;
    }
  },
  // 1: top, 0: center, -1: bottom
  getAnchorY: {
    type: 'accessor',
    value: function value(x) {
      return x.anchorY || 0;
    }
  },
  getPixelOffset: {
    type: 'accessor',
    value: [0, 0]
  },
  // object with the same pickingIndex will be picked when any one of them is being picked
  getPickingIndex: {
    type: 'accessor',
    value: function value(x) {
      return x.objectIndex;
    }
  }
};

var MultiIconLayer = /*#__PURE__*/function (_IconLayer) {
  _inherits(MultiIconLayer, _IconLayer);

  var _super = _createSuper(MultiIconLayer);

  function MultiIconLayer() {
    _classCallCheck(this, MultiIconLayer);

    return _super.apply(this, arguments);
  }

  _createClass(MultiIconLayer, [{
    key: "getShaders",
    value: function getShaders() {
      return Object.assign({}, _get(_getPrototypeOf(MultiIconLayer.prototype), "getShaders", this).call(this), {
        vs: vs,
        fs: fs
      });
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      _get(_getPrototypeOf(MultiIconLayer.prototype), "initializeState", this).call(this);

      var attributeManager = this.getAttributeManager();
      attributeManager.addInstanced({
        instanceOffsets: {
          size: 2,
          accessor: ['getIcon', 'getAnchorX', 'getAnchorY'],
          update: this.calculateInstanceOffsets
        },
        instancePixelOffset: {
          size: 2,
          transition: true,
          accessor: 'getPixelOffset'
        },
        instancePickingColors: {
          type: GL.UNSIGNED_BYTE,
          size: 3,
          update: this.calculateInstancePickingColors
        }
      });
    }
  }, {
    key: "updateState",
    value: function updateState(updateParams) {
      _get(_getPrototypeOf(MultiIconLayer.prototype), "updateState", this).call(this, updateParams);

      var changeFlags = updateParams.changeFlags,
          oldProps = updateParams.oldProps,
          props = updateParams.props;

      if (changeFlags.updateTriggersChanged && (changeFlags.updateTriggersChanged.getAnchorX || changeFlags.updateTriggersChanged.getAnchorY)) {
        this.getAttributeManager().invalidate('instanceOffsets');
      }

      if (props.backgroundColor !== oldProps.backgroundColor) {
        var backgroundColor = Array.isArray(props.backgroundColor) ? props.backgroundColor.map(function (c) {
          return c / 255.0;
        }).slice(0, 3) : null;
        this.setState({
          backgroundColor: backgroundColor
        });
      }
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var _this$props = this.props,
          sdf = _this$props.sdf,
          _this$props$show = _this$props.show,
          show = _this$props$show === void 0 ? true : _this$props$show;
      var backgroundColor = this.state.backgroundColor;
      var shouldDrawBackground = Array.isArray(backgroundColor);
      show && _get(_getPrototypeOf(MultiIconLayer.prototype), "draw", this).call(this, {
        uniforms: Object.assign({}, uniforms, {
          // Refer the following doc about gamma and buffer
          // https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817
          buffer: DEFAULT_BUFFER,
          gamma: DEFAULT_GAMMA,
          sdf: Boolean(sdf),
          backgroundColor: backgroundColor || [0, 0, 0],
          shouldDrawBackground: shouldDrawBackground
        })
      });
    }
  }, {
    key: "calculateInstanceOffsets",
    value: function calculateInstanceOffsets(attribute, _ref2) {
      var startRow = _ref2.startRow,
          endRow = _ref2.endRow;
      var _this$props2 = this.props,
          data = _this$props2.data,
          iconMapping = _this$props2.iconMapping,
          getIcon = _this$props2.getIcon,
          getAnchorX = _this$props2.getAnchorX,
          getAnchorY = _this$props2.getAnchorY,
          getParagraphSize = _this$props2.getParagraphSize,
          getRowSize = _this$props2.getRowSize,
          getOffsets = _this$props2.getOffsets;
      var value = attribute.value,
          size = attribute.size;
      var i = startRow * size;

      var _createIterable = createIterable(data, startRow, endRow),
          iterable = _createIterable.iterable;

      var _iterator = _createForOfIteratorHelper(iterable),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var object = _step.value;
          var icon = getIcon(object);
          var rect = iconMapping[icon] || {};

          var _getParagraphSize = getParagraphSize(object),
              _getParagraphSize2 = _slicedToArray(_getParagraphSize, 2),
              width = _getParagraphSize2[0],
              height = _getParagraphSize2[1];

          var _getRowSize = getRowSize(object),
              _getRowSize2 = _slicedToArray(_getRowSize, 1),
              rowWidth = _getRowSize2[0];

          var _getOffsets = getOffsets(object),
              _getOffsets2 = _slicedToArray(_getOffsets, 2),
              offsetX = _getOffsets2[0],
              offsetY = _getOffsets2[1];

          var anchorX = getAnchorX(object);
          var anchorY = getAnchorY(object); // For a multi-line object, offset in x-direction needs consider
          // the row offset in the paragraph and the object offset in the row

          var rowOffset = (1 - anchorX) * (width - rowWidth) / 2;
          value[i++] = (anchorX - 1) * width / 2 + rowOffset + rect.width / 2 + offsetX || 0;
          value[i++] = (anchorY - 1) * height / 2 + rect.height / 2 + offsetY || 0;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "calculateInstancePickingColors",
    value: function calculateInstancePickingColors(attribute, _ref3) {
      var startRow = _ref3.startRow,
          endRow = _ref3.endRow;
      var _this$props3 = this.props,
          data = _this$props3.data,
          getPickingIndex = _this$props3.getPickingIndex;
      var value = attribute.value,
          size = attribute.size;
      var i = startRow * size;
      var pickingColor = [];

      var _createIterable2 = createIterable(data, startRow, endRow),
          iterable = _createIterable2.iterable;

      var _iterator2 = _createForOfIteratorHelper(iterable),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var point = _step2.value;
          var index = getPickingIndex(point);
          this.encodePickingColor(index, pickingColor);
          value[i++] = pickingColor[0];
          value[i++] = pickingColor[1];
          value[i++] = pickingColor[2];
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);

  return MultiIconLayer;
}(IconLayer);

export { MultiIconLayer as default };
MultiIconLayer.layerName = 'MultiIconLayer';
MultiIconLayer.defaultProps = defaultProps;