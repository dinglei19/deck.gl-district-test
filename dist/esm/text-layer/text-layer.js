function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
import { CompositeLayer, createIterable } from '@deck.gl/core';
import MultiIconLayer from "./multi-icon-layer/multi-icon-layer";
import FontAtlasManager, { DEFAULT_CHAR_SET, DEFAULT_FONT_FAMILY, DEFAULT_FONT_WEIGHT, DEFAULT_FONT_SIZE, DEFAULT_BUFFER, DEFAULT_RADIUS, DEFAULT_CUTOFF } from "./font-atlas-manager";
import { transformParagraph, replaceInRange } from "./utils";
var DEFAULT_FONT_SETTINGS = {
  fontSize: DEFAULT_FONT_SIZE,
  buffer: DEFAULT_BUFFER,
  sdf: false,
  radius: DEFAULT_RADIUS,
  cutoff: DEFAULT_CUTOFF
};
var TEXT_ANCHOR = {
  start: 1,
  middle: 0,
  end: -1
};
var ALIGNMENT_BASELINE = {
  top: 1,
  center: 0,
  bottom: -1
};
var DEFAULT_COLOR = [0, 0, 0, 255];
var DEFAULT_LINE_HEIGHT = 1.0;
var FONT_SETTINGS_PROPS = ['fontSize', 'buffer', 'sdf', 'radius', 'cutoff'];
var defaultProps = {
  billboard: true,
  sizeScale: 1,
  sizeUnits: 'pixels',
  sizeMinPixels: 0,
  sizeMaxPixels: Number.MAX_SAFE_INTEGER,
  backgroundColor: {
    type: 'color',
    value: null,
    optional: true
  },
  characterSet: DEFAULT_CHAR_SET,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  lineHeight: DEFAULT_LINE_HEIGHT,
  fontSettings: {},
  // auto wrapping options
  wordBreak: 'word-break',
  maxWidth: {
    type: 'number',
    value: -1
  },
  getText: {
    type: 'accessor',
    value: function value(x) {
      return x.text;
    }
  },
  getPosition: {
    type: 'accessor',
    value: function value(x) {
      return x.position;
    }
  },
  getColor: {
    type: 'accessor',
    value: DEFAULT_COLOR
  },
  getSize: {
    type: 'accessor',
    value: 32
  },
  getAngle: {
    type: 'accessor',
    value: 0
  },
  getTextAnchor: {
    type: 'accessor',
    value: 'middle'
  },
  getAlignmentBaseline: {
    type: 'accessor',
    value: 'center'
  },
  getPixelOffset: {
    type: 'accessor',
    value: [0, 0]
  }
};

var TextLayer = /*#__PURE__*/function (_CompositeLayer) {
  _inherits(TextLayer, _CompositeLayer);

  var _super = _createSuper(TextLayer);

  function TextLayer() {
    _classCallCheck(this, TextLayer);

    return _super.apply(this, arguments);
  }

  _createClass(TextLayer, [{
    key: "initializeState",
    value: function initializeState() {
      this.state = {
        fontAtlasManager: new FontAtlasManager(this.context.gl)
      };
    } // eslint-disable-next-line complexity

  }, {
    key: "updateState",
    value: function updateState(_ref) {
      var _this = this;

      var props = _ref.props,
          oldProps = _ref.oldProps,
          changeFlags = _ref.changeFlags;
      var fontChanged = this.fontChanged(oldProps, props);
      this.updateFontAtlas({
        oldProps: oldProps,
        props: props
      });
      var styleChanged = props.lineHeight !== oldProps.lineHeight || props.wordBreak !== oldProps.wordBreak || props.maxWidth !== oldProps.maxWidth;
      var textChanged = fontChanged || styleChanged || changeFlags.dataChanged || changeFlags.updateTriggersChanged && (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getText);

      if (textChanged && Array.isArray(changeFlags.dataChanged)) {
        var data = this.state.data.slice();
        var dataDiff = changeFlags.dataChanged.map(function (dataRange) {
          return replaceInRange({
            data: data,
            getIndex: function getIndex(p) {
              return p.__source.index;
            },
            dataRange: dataRange,
            replace: _this.transformStringToLetters(dataRange)
          });
        });
        this.setState({
          data: data,
          dataDiff: dataDiff
        });
      } else if (textChanged) {
        this.setState({
          data: this.transformStringToLetters(),
          dataDiff: null
        });
      }
    }
  }, {
    key: "finalizeState",
    value: function finalizeState() {
      _get(_getPrototypeOf(TextLayer.prototype), "finalizeState", this).call(this); // Release resources held by the font atlas manager


      this.state.fontAtlasManager.finalize();
    }
  }, {
    key: "updateFontAtlas",
    value: function updateFontAtlas(_ref2) {
      var props = _ref2.props;
      var data = this.props.data;
      var characterSet = props.characterSet,
          fontSettings = props.fontSettings,
          fontFamily = props.fontFamily,
          fontWeight = props.fontWeight,
          getText = props.getText;

      var _createIterable = createIterable(data),
          iterable = _createIterable.iterable,
          objectInfo = _createIterable.objectInfo;

      var _iterator = _createForOfIteratorHelper(iterable),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var object = _step.value;
          var text = getText(object, objectInfo);

          if (typeof text !== "undefined") {
            for (var index = 0; index < text.length; index++) {
              var str = text[index];

              if (characterSet.indexOf(str) === -1) {
                characterSet.push(str);
              }
            }
          }
        } // generate test characterSet

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var fontAtlasManager = this.state.fontAtlasManager;
      fontAtlasManager.setProps(Object.assign({}, DEFAULT_FONT_SETTINGS, fontSettings, {
        characterSet: characterSet,
        fontFamily: fontFamily,
        fontWeight: fontWeight
      }));
      var scale = fontAtlasManager.scale,
          texture = fontAtlasManager.texture,
          mapping = fontAtlasManager.mapping;
      this.setState({
        scale: scale,
        iconAtlas: texture,
        iconMapping: mapping
      });
      this.setNeedsRedraw(true);
    }
  }, {
    key: "fontChanged",
    value: function fontChanged(oldProps, props) {
      if (oldProps.fontFamily !== props.fontFamily || oldProps.characterSet !== props.characterSet || oldProps.fontWeight !== props.fontWeight) {
        return true;
      }

      if (oldProps.fontSettings === props.fontSettings) {
        return false;
      }

      var oldFontSettings = oldProps.fontSettings || {};
      var fontSettings = props.fontSettings || {};
      return FONT_SETTINGS_PROPS.some(function (prop) {
        return oldFontSettings[prop] !== fontSettings[prop];
      });
    }
  }, {
    key: "getPickingInfo",
    value: function getPickingInfo(_ref3) {
      var info = _ref3.info;
      // because `TextLayer` assign the same pickingInfoIndex for one text label,
      // here info.index refers the index of text label in props.data
      return Object.assign(info, {
        // override object with original data
        object: info.index >= 0 ? this.props.data[info.index] : null
      });
    }
    /* eslint-disable no-loop-func */

  }, {
    key: "transformStringToLetters",
    value: function transformStringToLetters() {
      var _this2 = this;

      var dataRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props = this.props,
          data = _this$props.data,
          wordBreak = _this$props.wordBreak,
          maxWidth = _this$props.maxWidth,
          lineHeight = _this$props.lineHeight,
          getText = _this$props.getText;
      var iconMapping = this.state.iconMapping;
      var startRow = dataRange.startRow,
          endRow = dataRange.endRow;

      var _createIterable2 = createIterable(data, startRow, endRow),
          iterable = _createIterable2.iterable,
          objectInfo = _createIterable2.objectInfo;

      var transformedData = [];

      var _iterator2 = _createForOfIteratorHelper(iterable),
          _step2;

      try {
        var _loop = function _loop() {
          var object = _step2.value;

          var transformCharacter = function transformCharacter(transformed) {
            return _this2.getSubLayerRow(transformed, object, objectInfo.index);
          };

          objectInfo.index++;
          var text = getText(object, objectInfo);

          if (text) {
            transformParagraph(text, lineHeight, wordBreak, maxWidth, iconMapping, transformCharacter, transformedData);
          }
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return transformedData;
    }
  }, {
    key: "getAnchorXFromTextAnchor",
    value: function getAnchorXFromTextAnchor(getTextAnchor) {
      if (typeof getTextAnchor === 'function') {
        getTextAnchor = this.getSubLayerAccessor(getTextAnchor);
        return function (x) {
          return TEXT_ANCHOR[getTextAnchor(x)] || 0;
        };
      }

      return function () {
        return TEXT_ANCHOR[getTextAnchor] || 0;
      };
    }
  }, {
    key: "getAnchorYFromAlignmentBaseline",
    value: function getAnchorYFromAlignmentBaseline(getAlignmentBaseline) {
      if (typeof getAlignmentBaseline === 'function') {
        getAlignmentBaseline = this.getSubLayerAccessor(getAlignmentBaseline);
        return function (x) {
          return TEXT_ANCHOR[getAlignmentBaseline(x)] || 0;
        };
      }

      return function () {
        return ALIGNMENT_BASELINE[getAlignmentBaseline] || 0;
      };
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      var _this$state = this.state,
          data = _this$state.data,
          dataDiff = _this$state.dataDiff,
          scale = _this$state.scale,
          iconAtlas = _this$state.iconAtlas,
          iconMapping = _this$state.iconMapping,
          _this$state$show = _this$state.show,
          show = _this$state$show === void 0 ? true : _this$state$show;
      var _this$props2 = this.props,
          backgroundColor = _this$props2.backgroundColor,
          getPosition = _this$props2.getPosition,
          getColor = _this$props2.getColor,
          getSize = _this$props2.getSize,
          getAngle = _this$props2.getAngle,
          getTextAnchor = _this$props2.getTextAnchor,
          getAlignmentBaseline = _this$props2.getAlignmentBaseline,
          getPixelOffset = _this$props2.getPixelOffset,
          billboard = _this$props2.billboard,
          sdf = _this$props2.sdf,
          sizeScale = _this$props2.sizeScale,
          sizeUnits = _this$props2.sizeUnits,
          sizeMinPixels = _this$props2.sizeMinPixels,
          sizeMaxPixels = _this$props2.sizeMaxPixels,
          transitions = _this$props2.transitions,
          updateTriggers = _this$props2.updateTriggers;
      var SubLayerClass = this.getSubLayerClass('characters', MultiIconLayer);
      return new SubLayerClass({
        sdf: sdf,
        iconAtlas: iconAtlas,
        iconMapping: iconMapping,
        backgroundColor: backgroundColor,
        _dataDiff: dataDiff && function () {
          return dataDiff;
        },
        getPosition: this.getSubLayerAccessor(getPosition),
        getColor: this.getSubLayerAccessor(getColor),
        getSize: this.getSubLayerAccessor(getSize),
        getAngle: this.getSubLayerAccessor(getAngle),
        getAnchorX: this.getAnchorXFromTextAnchor(getTextAnchor),
        getAnchorY: this.getAnchorYFromAlignmentBaseline(getAlignmentBaseline),
        getPixelOffset: this.getSubLayerAccessor(getPixelOffset),
        getPickingIndex: function getPickingIndex(obj) {
          return obj.__source.index;
        },
        billboard: billboard,
        show: show,
        sizeScale: sizeScale * scale,
        sizeUnits: sizeUnits,
        sizeMinPixels: sizeMinPixels * scale,
        sizeMaxPixels: sizeMaxPixels * scale,
        transitions: transitions && {
          getPosition: transitions.getPosition,
          getAngle: transitions.getAngle,
          getColor: transitions.getColor,
          getSize: transitions.getSize,
          getPixelOffset: updateTriggers.getPixelOffset
        }
      }, this.getSubLayerProps({
        id: 'characters',
        updateTriggers: {
          getPosition: updateTriggers.getPosition,
          getAngle: updateTriggers.getAngle,
          getColor: updateTriggers.getColor,
          getSize: updateTriggers.getSize,
          getPixelOffset: updateTriggers.getPixelOffset,
          getAnchorX: updateTriggers.getTextAnchor,
          getAnchorY: updateTriggers.getAlignmentBaseline
        }
      }), {
        data: data,
        getIcon: function getIcon(d) {
          return d.text;
        },
        getRowSize: function getRowSize(d) {
          return d.rowSize;
        },
        getOffsets: function getOffsets(d) {
          return [d.offsetLeft, d.offsetTop];
        },
        getParagraphSize: function getParagraphSize(d) {
          return d.size;
        }
      });
    }
  }]);

  return TextLayer;
}(CompositeLayer);

export { TextLayer as default };
TextLayer.layerName = 'TextLayer';
TextLayer.defaultProps = defaultProps;