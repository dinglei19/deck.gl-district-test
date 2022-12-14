function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* global document */
import { Texture2D } from '@luma.gl/core';
import TinySDF from '@mapbox/tiny-sdf';
import { buildMapping } from "./utils";
import LRUCache from "./lru-cache";

function getDefaultCharacterSet() {
  var charSet = [];

  for (var i = 32; i < 128; i++) {
    charSet.push(String.fromCharCode(i));
  }

  return charSet;
}

export var DEFAULT_CHAR_SET = getDefaultCharacterSet();
export var DEFAULT_FONT_FAMILY = 'Monaco, monospace';
export var DEFAULT_FONT_WEIGHT = 'normal';
export var DEFAULT_FONT_SIZE = 64;
export var DEFAULT_BUFFER = 2;
export var DEFAULT_CUTOFF = 0.25;
export var DEFAULT_RADIUS = 3;
var GL_TEXTURE_WRAP_S = 0x2802;
var GL_TEXTURE_WRAP_T = 0x2803;
var GL_CLAMP_TO_EDGE = 0x812f;
var MAX_CANVAS_WIDTH = 1024;
var BASELINE_SCALE = 0.9;
var HEIGHT_SCALE = 1.2; // only preserve latest three fontAtlas

var CACHE_LIMIT = 3;
/**
 * [key]: {
 *   xOffset, // x position of last character in mapping
 *   yOffset, // y position of last character in mapping
 *   mapping, // x, y coordinate of each character in shared `fontAtlas`
 *   data, // canvas
 *   width. // canvas.width,
 *   height, // canvas.height
 * }
 *
 */

var cache = new LRUCache(CACHE_LIMIT);
var VALID_PROPS = ['fontFamily', 'fontWeight', 'characterSet', 'fontSize', 'sdf', 'buffer', 'cutoff', 'radius'];
/**
 * get all the chars not in cache
 * @param key cache key
 * @param characterSet (Array|Set)
 * @returns {Array} chars not in cache
 */

function getNewChars(key, characterSet) {
  var cachedFontAtlas = cache.get(key);

  if (!cachedFontAtlas) {
    return characterSet;
  }

  var newChars = [];
  var cachedMapping = cachedFontAtlas.mapping;
  var cachedCharSet = Object.keys(cachedMapping);
  cachedCharSet = new Set(cachedCharSet);
  var charSet = characterSet;

  if (charSet instanceof Array) {
    charSet = new Set(charSet);
  }

  charSet.forEach(function (char) {
    if (!cachedCharSet.has(char)) {
      newChars.push(char);
    }
  });
  return newChars;
}

function populateAlphaChannel(alphaChannel, imageData) {
  // populate distance value from tinySDF to image alpha channel
  for (var i = 0; i < alphaChannel.length; i++) {
    imageData.data[4 * i + 3] = alphaChannel[i];
  }
}

function setTextStyle(ctx, fontFamily, fontSize, fontWeight) {
  ctx.font = "".concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'baseline';
  ctx.textAlign = 'left';
}

var FontAtlasManager = /*#__PURE__*/function () {
  function FontAtlasManager(gl) {
    _classCallCheck(this, FontAtlasManager);

    this.gl = gl; // font settings

    this.props = {
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: DEFAULT_FONT_WEIGHT,
      characterSet: DEFAULT_CHAR_SET,
      fontSize: DEFAULT_FONT_SIZE,
      buffer: DEFAULT_BUFFER,
      // sdf only props
      // https://github.com/mapbox/tiny-sdf
      sdf: false,
      cutoff: DEFAULT_CUTOFF,
      radius: DEFAULT_RADIUS
    }; // key is used for caching generated fontAtlas

    this._key = null;
    this._texture = new Texture2D(this.gl);
  }

  _createClass(FontAtlasManager, [{
    key: "finalize",
    value: function finalize() {
      this._texture.delete();
    }
  }, {
    key: "texture",
    get: function get() {
      return this._texture;
    }
  }, {
    key: "mapping",
    get: function get() {
      var data = cache.get(this._key);
      return data && data.mapping;
    }
  }, {
    key: "scale",
    get: function get() {
      return HEIGHT_SCALE;
    }
  }, {
    key: "setProps",
    value: function setProps() {
      var _this = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      VALID_PROPS.forEach(function (prop) {
        if (prop in props) {
          _this.props[prop] = props[prop];
        }
      }); // update cache key

      var oldKey = this._key;
      this._key = this._getKey();
      var charSet = getNewChars(this._key, this.props.characterSet);
      var cachedFontAtlas = cache.get(this._key); // if a fontAtlas associated with the new settings is cached and
      // there are no new chars

      if (cachedFontAtlas && charSet.length === 0) {
        // update texture with cached fontAtlas
        if (this._key !== oldKey) {
          this._updateTexture(cachedFontAtlas);
        }

        return;
      } // update fontAtlas with new settings


      var fontAtlas = this._generateFontAtlas(this._key, charSet, cachedFontAtlas);

      this._updateTexture(fontAtlas); // update cache


      cache.set(this._key, fontAtlas);
    }
  }, {
    key: "_updateTexture",
    value: function _updateTexture(_ref) {
      var _parameters;

      var canvas = _ref.data,
          width = _ref.width,
          height = _ref.height;

      // resize texture
      if (this._texture.width !== width || this._texture.height !== height) {
        this._texture.resize({
          width: width,
          height: height
        });
      } // update image data


      this._texture.setImageData({
        data: canvas,
        width: width,
        height: height,
        parameters: (_parameters = {}, _defineProperty(_parameters, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE), _defineProperty(_parameters, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE), _parameters)
      }); // this is required step after texture data changed


      this._texture.generateMipmap();
    }
  }, {
    key: "_generateFontAtlas",
    value: function _generateFontAtlas(key, characterSet, cachedFontAtlas) {
      var _this$props = this.props,
          fontFamily = _this$props.fontFamily,
          fontWeight = _this$props.fontWeight,
          fontSize = _this$props.fontSize,
          buffer = _this$props.buffer,
          sdf = _this$props.sdf,
          radius = _this$props.radius,
          cutoff = _this$props.cutoff;
      var canvas = cachedFontAtlas && cachedFontAtlas.data;

      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.width = MAX_CANVAS_WIDTH;
      }

      var ctx = canvas.getContext('2d');
      setTextStyle(ctx, fontFamily, fontSize, fontWeight); // 1. build mapping

      var _buildMapping = buildMapping(Object.assign({
        getFontWidth: function getFontWidth(char) {
          return ctx.measureText(char).width;
        },
        fontHeight: fontSize * HEIGHT_SCALE,
        buffer: buffer,
        characterSet: characterSet,
        maxCanvasWidth: MAX_CANVAS_WIDTH
      }, cachedFontAtlas && {
        mapping: cachedFontAtlas.mapping,
        xOffset: cachedFontAtlas.xOffset,
        yOffset: cachedFontAtlas.yOffset
      })),
          mapping = _buildMapping.mapping,
          canvasHeight = _buildMapping.canvasHeight,
          xOffset = _buildMapping.xOffset,
          yOffset = _buildMapping.yOffset; // 2. update canvas
      // copy old canvas data to new canvas only when height changed


      if (canvas.height !== canvasHeight) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = canvasHeight;
        ctx.putImageData(imageData, 0, 0);
      }

      setTextStyle(ctx, fontFamily, fontSize, fontWeight); // 3. layout characters

      if (sdf) {
        var tinySDF = new TinySDF(fontSize, buffer, radius, cutoff, fontFamily, fontWeight); // used to store distance values from tinySDF
        // tinySDF.size equals `fontSize + buffer * 2`

        var _imageData = ctx.getImageData(0, 0, tinySDF.size, tinySDF.size);

        var _iterator = _createForOfIteratorHelper(characterSet),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var char = _step.value;
            populateAlphaChannel(tinySDF.draw(char), _imageData);
            ctx.putImageData(_imageData, mapping[char].x - buffer, mapping[char].y - buffer);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        var _iterator2 = _createForOfIteratorHelper(characterSet),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _char = _step2.value;
            ctx.fillText(_char, mapping[_char].x, mapping[_char].y + fontSize * BASELINE_SCALE);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return {
        xOffset: xOffset,
        yOffset: yOffset,
        mapping: mapping,
        data: canvas,
        width: canvas.width,
        height: canvas.height
      };
    }
  }, {
    key: "_getKey",
    value: function _getKey() {
      var _this$props2 = this.props,
          gl = _this$props2.gl,
          fontFamily = _this$props2.fontFamily,
          fontWeight = _this$props2.fontWeight,
          fontSize = _this$props2.fontSize,
          buffer = _this$props2.buffer,
          sdf = _this$props2.sdf,
          radius = _this$props2.radius,
          cutoff = _this$props2.cutoff;

      if (sdf) {
        return "".concat(gl, " ").concat(fontFamily, " ").concat(fontWeight, " ").concat(fontSize, " ").concat(buffer, " ").concat(radius, " ").concat(cutoff);
      }

      return "".concat(gl, " ").concat(fontFamily, " ").concat(fontWeight, " ").concat(fontSize, " ").concat(buffer);
    }
  }]);

  return FontAtlasManager;
}();

export { FontAtlasManager as default };