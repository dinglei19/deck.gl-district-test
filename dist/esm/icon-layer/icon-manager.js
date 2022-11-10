var _DEFAULT_TEXTURE_PARA;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import GL from '@luma.gl/constants';
import { Texture2D, copyToTexture, cloneTextureFrom } from '@luma.gl/core';
import { loadImage } from '@loaders.gl/images';
import { createIterable } from '@deck.gl/core';
var DEFAULT_CANVAS_WIDTH = 1024;
var DEFAULT_BUFFER = 4;

var noop = function noop() {};

var DEFAULT_TEXTURE_PARAMETERS = (_DEFAULT_TEXTURE_PARA = {}, _defineProperty(_DEFAULT_TEXTURE_PARA, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR), _defineProperty(_DEFAULT_TEXTURE_PARA, GL.TEXTURE_MAG_FILTER, GL.LINEAR), _DEFAULT_TEXTURE_PARA);

function nextPowOfTwo(number) {
  return Math.ceil(Math.log2(number)) * Math.ceil(Math.log2(number));
} // update comment to create a new texture and copy original data.


function resizeImage(ctx, imageData, width, height) {
  var naturalWidth = imageData.naturalWidth,
      naturalHeight = imageData.naturalHeight;

  if (width === naturalWidth && height === naturalHeight) {
    return imageData;
  }

  ctx.canvas.height = height;
  ctx.canvas.width = width;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight

  ctx.drawImage(imageData, 0, 0, naturalWidth, naturalHeight, 0, 0, width, height);
  return ctx.canvas;
}

function getIconId(icon) {
  return icon && (icon.id || icon.url);
} // resize texture without losing original data


function resizeTexture(gl, texture, width, height) {
  var oldWidth = texture.width;
  var oldHeight = texture.height;
  var newTexture = cloneTextureFrom(texture, {
    width: width,
    height: height
  });
  copyToTexture(texture, newTexture, {
    targetY: height - oldHeight,
    width: oldWidth,
    height: oldHeight
  });
  texture.delete();
  return newTexture;
} // traverse icons in a row of icon atlas
// extend each icon with left-top coordinates


function buildRowMapping(mapping, columns, yOffset) {
  for (var i = 0; i < columns.length; i++) {
    var _columns$i = columns[i],
        icon = _columns$i.icon,
        xOffset = _columns$i.xOffset;
    var id = getIconId(icon);
    mapping[id] = _objectSpread(_objectSpread({}, icon), {}, {
      x: xOffset,
      y: yOffset
    });
  }
}
/**
 * Generate coordinate mapping to retrieve icon left-top position from an icon atlas
 * @param icons {Array<Object>} list of icons, each icon requires url, width, height
 * @param buffer {Number} add buffer to the right and bottom side of the image
 * @param xOffset {Number} right position of last icon in old mapping
 * @param yOffset {Number} top position in last icon in old mapping
 * @param rowHeight {Number} rowHeight of the last icon's row
 * @param canvasWidth {Number} max width of canvas
 * @param mapping {object} old mapping
 * @returns {{mapping: {'/icon/1': {url, width, height, ...}},, canvasHeight: {Number}}}
 */


export function buildMapping(_ref) {
  var icons = _ref.icons,
      buffer = _ref.buffer,
      _ref$mapping = _ref.mapping,
      mapping = _ref$mapping === void 0 ? {} : _ref$mapping,
      _ref$xOffset = _ref.xOffset,
      xOffset = _ref$xOffset === void 0 ? 0 : _ref$xOffset,
      _ref$yOffset = _ref.yOffset,
      yOffset = _ref$yOffset === void 0 ? 0 : _ref$yOffset,
      _ref$rowHeight = _ref.rowHeight,
      rowHeight = _ref$rowHeight === void 0 ? 0 : _ref$rowHeight,
      canvasWidth = _ref.canvasWidth;
  var columns = []; // Strategy to layout all the icons into a texture:
  // traverse the icons sequentially, layout the icons from left to right, top to bottom
  // when the sum of the icons width is equal or larger than canvasWidth,
  // move to next row starting from total height so far plus max height of the icons in previous row
  // row width is equal to canvasWidth
  // row height is decided by the max height of the icons in that row
  // mapping coordinates of each icon is its left-top position in the texture

  for (var i = 0; i < icons.length; i++) {
    var icon = icons[i];
    var id = getIconId(icon);

    if (!mapping[id]) {
      var height = icon.height,
          width = icon.width; // fill one row

      if (xOffset + width + buffer > canvasWidth) {
        buildRowMapping(mapping, columns, yOffset);
        xOffset = 0;
        yOffset = rowHeight + yOffset + buffer;
        rowHeight = 0;
        columns = [];
      }

      columns.push({
        icon: icon,
        xOffset: xOffset
      });
      xOffset = xOffset + width + buffer;
      rowHeight = Math.max(rowHeight, height);
    }
  }

  if (columns.length > 0) {
    buildRowMapping(mapping, columns, yOffset);
  }

  return {
    mapping: mapping,
    rowHeight: rowHeight,
    xOffset: xOffset,
    yOffset: yOffset,
    canvasWidth: canvasWidth,
    canvasHeight: nextPowOfTwo(rowHeight + yOffset + buffer)
  };
} // extract icons from data
// return icons should be unique, and not cached or cached but url changed

export function getDiffIcons(data, getIcon, cachedIcons) {
  if (!data || !getIcon) {
    return null;
  }

  cachedIcons = cachedIcons || {};
  var icons = {};

  var _createIterable = createIterable(data),
      iterable = _createIterable.iterable,
      objectInfo = _createIterable.objectInfo;

  var _iterator = _createForOfIteratorHelper(iterable),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var object = _step.value;
      objectInfo.index++;
      var icon = getIcon(object, objectInfo);
      var id = getIconId(icon);

      if (!icon) {
        throw new Error('Icon is missing.');
      }

      if (!icon.url) {
        throw new Error('Icon url is missing.');
      }

      if (!icons[id] && (!cachedIcons[id] || icon.url !== cachedIcons[id].url)) {
        icons[id] = icon;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return icons;
}

var IconManager = /*#__PURE__*/function () {
  function IconManager(gl, _ref2) {
    var _ref2$onUpdate = _ref2.onUpdate,
        onUpdate = _ref2$onUpdate === void 0 ? noop : _ref2$onUpdate;

    _classCallCheck(this, IconManager);

    this.gl = gl;
    this.onUpdate = onUpdate;
    this._getIcon = null;
    this._texture = null;
    this._externalTexture = null;
    this._mapping = {};
    this._autoPacking = false; // internal props used when autoPacking applied
    // right position of last icon

    this._xOffset = 0; // top position of last icon

    this._yOffset = 0;
    this._rowHeight = 0;
    this._buffer = DEFAULT_BUFFER;
    this._canvasWidth = DEFAULT_CANVAS_WIDTH;
    this._canvasHeight = 0;
    this._canvas = null;
  }

  _createClass(IconManager, [{
    key: "finalize",
    value: function finalize() {
      if (this._texture) {
        this._texture.delete();
      }
    }
  }, {
    key: "getTexture",
    value: function getTexture() {
      return this._texture || this._externalTexture;
    }
  }, {
    key: "getIconMapping",
    value: function getIconMapping(icon) {
      var id = this._autoPacking ? getIconId(icon) : icon;
      return this._mapping[id] || {};
    }
  }, {
    key: "setProps",
    value: function setProps(_ref3) {
      var autoPacking = _ref3.autoPacking,
          iconAtlas = _ref3.iconAtlas,
          iconMapping = _ref3.iconMapping,
          data = _ref3.data,
          getIcon = _ref3.getIcon;

      if (autoPacking !== undefined) {
        this._autoPacking = autoPacking;
      }

      if (getIcon) {
        this._getIcon = getIcon;
      }

      if (iconMapping) {
        this._mapping = iconMapping;
      }

      if (iconAtlas) {
        this._updateIconAtlas(iconAtlas);
      }

      if (this._autoPacking && (data || getIcon) && typeof document !== 'undefined') {
        this._canvas = this._canvas || document.createElement('canvas');

        this._updateAutoPacking(data);
      }
    }
  }, {
    key: "_updateIconAtlas",
    value: function _updateIconAtlas(iconAtlas) {
      if (this._texture) {
        this._texture.delete();

        this._texture = null;
      }

      if (iconAtlas instanceof Texture2D) {
        iconAtlas.setParameters(DEFAULT_TEXTURE_PARAMETERS);
        this._externalTexture = iconAtlas;
        this.onUpdate();
      } else if (iconAtlas) {
        // Browser object: Image, ImageData, HTMLCanvasElement, ImageBitmap
        this._texture = new Texture2D(this.gl, {
          data: iconAtlas,
          parameters: DEFAULT_TEXTURE_PARAMETERS
        });
        this.onUpdate();
      }
    }
  }, {
    key: "_updateAutoPacking",
    value: function _updateAutoPacking(data) {
      var icons = Object.values(getDiffIcons(data, this._getIcon, this._mapping) || {});

      if (icons.length > 0) {
        // generate icon mapping
        var _buildMapping = buildMapping({
          icons: icons,
          buffer: this._buffer,
          canvasWidth: this._canvasWidth,
          mapping: this._mapping,
          rowHeight: this._rowHeight,
          xOffset: this._xOffset,
          yOffset: this._yOffset
        }),
            mapping = _buildMapping.mapping,
            xOffset = _buildMapping.xOffset,
            yOffset = _buildMapping.yOffset,
            rowHeight = _buildMapping.rowHeight,
            canvasHeight = _buildMapping.canvasHeight;

        this._rowHeight = rowHeight;
        this._mapping = mapping;
        this._xOffset = xOffset;
        this._yOffset = yOffset;
        this._canvasHeight = canvasHeight; // create new texture

        if (!this._texture) {
          this._texture = new Texture2D(this.gl, {
            width: this._canvasWidth,
            height: this._canvasHeight,
            parameters: DEFAULT_TEXTURE_PARAMETERS
          });
        }

        if (this._texture.height !== this._canvasHeight) {
          this._texture = resizeTexture(this.gl, this._texture, this._canvasWidth, this._canvasHeight);
        }

        this.onUpdate(); // load images

        this._loadIcons(icons);
      }
    }
  }, {
    key: "_loadIcons",
    value: function _loadIcons(icons) {
      var _this = this;

      var ctx = this._canvas.getContext('2d');

      var _iterator2 = _createForOfIteratorHelper(icons),
          _step2;

      try {
        var _loop = function _loop() {
          var icon = _step2.value;
          loadImage(icon.url).then(function (imageData) {
            var id = getIconId(icon);
            var _this$_mapping$id = _this._mapping[id],
                x = _this$_mapping$id.x,
                y = _this$_mapping$id.y,
                width = _this$_mapping$id.width,
                height = _this$_mapping$id.height;
            var data = resizeImage(ctx, imageData, width, height);

            _this._texture.setSubImageData({
              data: data,
              x: x,
              y: y,
              width: width,
              height: height
            }); // Call to regenerate mipmaps after modifying texture(s)


            _this._texture.generateMipmap();

            _this.onUpdate();
          });
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);

  return IconManager;
}();

export { IconManager as default };