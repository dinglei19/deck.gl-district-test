function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// TODO merge with icon-layer/icon-manager
import { log } from '@deck.gl/core';
var MISSING_CHAR_WIDTH = 32;
export function nextPowOfTwo(number) {
  return Math.pow(2, Math.ceil(Math.log2(number)));
}
/**
 * Generate character mapping table or update from an existing mapping table
 * @param characterSet {Array|Set} new characters
 * @param getFontWidth {Function} function to get width of each character
 * @param fontHeight {Number} height of font
 * @param buffer {Number} buffer surround each character
 * @param maxCanvasWidth {Number} max width of font atlas
 * @param mapping {Object} old mapping table
 * @param xOffset {Number} x position of last character in old mapping table
 * @param yOffset {Number} y position of last character in old mapping table
 * @returns {{
 *   mapping: Object,
 *   xOffset: Number, x position of last character
 *   yOffset: Number, y position of last character in old mapping table
 *   canvasHeight: Number, height of the font atlas canvas, power of 2
 *  }}
 */

export function buildMapping(_ref) {
  var characterSet = _ref.characterSet,
      getFontWidth = _ref.getFontWidth,
      fontHeight = _ref.fontHeight,
      buffer = _ref.buffer,
      maxCanvasWidth = _ref.maxCanvasWidth,
      _ref$mapping = _ref.mapping,
      mapping = _ref$mapping === void 0 ? {} : _ref$mapping,
      _ref$xOffset = _ref.xOffset,
      xOffset = _ref$xOffset === void 0 ? 0 : _ref$xOffset,
      _ref$yOffset = _ref.yOffset,
      yOffset = _ref$yOffset === void 0 ? 0 : _ref$yOffset;
  var row = 0; // continue from x position of last character in the old mapping

  var x = xOffset;
  var i = 0;

  var _iterator = _createForOfIteratorHelper(characterSet),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var char = _step.value;

      if (!mapping[char]) {
        // measure texts
        // TODO - use Advanced text metrics when they are adopted:
        // https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
        var width = getFontWidth(char, i++);

        if (x + width + buffer * 2 > maxCanvasWidth) {
          x = 0;
          row++;
        }

        mapping[char] = {
          x: x + buffer,
          y: yOffset + row * (fontHeight + buffer * 2) + buffer,
          width: width,
          height: fontHeight,
          mask: true
        };
        x += width + buffer * 2;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var rowHeight = fontHeight + buffer * 2;
  return {
    mapping: mapping,
    xOffset: x,
    yOffset: yOffset + row * rowHeight,
    canvasHeight: nextPowOfTwo(yOffset + (row + 1) * rowHeight)
  };
}

function getTextWidth(text, mapping) {
  var width = 0;

  for (var i = 0; i < text.length; i++) {
    var character = text[i];
    var frameWidth = null;
    var frame = mapping && mapping[character];

    if (frame) {
      frameWidth = frame.width;
    } else {
      log.warn("Missing character: ".concat(character))();
      frameWidth = MISSING_CHAR_WIDTH;
    }

    width += frameWidth;
  }

  return width;
}

function breakAll(text, maxWidth, iconMapping) {
  var rows = [];
  var rowStartCharIndex = 0;
  var rowOffsetLeft = 0;

  for (var i = 0; i < text.length; i++) {
    // 2. figure out where to break lines
    var textWidth = getTextWidth(text[i], iconMapping);

    if (rowOffsetLeft + textWidth > maxWidth) {
      if (rowStartCharIndex < i) {
        rows.push(text.substring(rowStartCharIndex, i));
      }

      rowStartCharIndex = i;
      rowOffsetLeft = 0;
    }

    rowOffsetLeft += textWidth;
  } // last row


  if (rowStartCharIndex < text.length) {
    rows.push(text.substring(rowStartCharIndex));
  }

  return {
    rows: rows,
    lastRowStartCharIndex: rowStartCharIndex,
    lastRowOffsetLeft: rowOffsetLeft
  };
}
/* eslint-disable max-statements, complexity, max-depth */


function breakWord(text, maxWidth, iconMapping) {
  var rows = [];
  var rowStartCharIndex = 0;
  var groupStartCharIndex = 0;
  var rowOffsetLeft = 0;
  var group = null;

  for (var i = 0; i < text.length; i++) {
    // 1. break text into word groups
    //  - if current char is white space
    //  - else if next char is white space
    //  - else if reach last char
    if (text[i] === ' ') {
      group = text[i];
      groupStartCharIndex = i + 1;
    } else if (i + 1 < text.length && text[i + 1] === ' ' || i + 1 === text.length) {
      group = text.substring(groupStartCharIndex, i + 1);
      groupStartCharIndex = i + 1;
    } else {
      group = null;
    }

    if (group) {
      // 2. break text into next row at maxWidth
      var groupWidth = getTextWidth(group, iconMapping);

      if (rowOffsetLeft + groupWidth > maxWidth) {
        var lastGroupStartIndex = groupStartCharIndex - group.length;

        if (rowStartCharIndex < lastGroupStartIndex) {
          rows.push(text.substring(rowStartCharIndex, lastGroupStartIndex));
          rowStartCharIndex = lastGroupStartIndex;
          rowOffsetLeft = 0;
        } // if a single text group is bigger than maxWidth, then `break-all`


        if (groupWidth > maxWidth) {
          var subGroups = breakAll(group, maxWidth, iconMapping);

          if (subGroups.rows.length > 1) {
            // add all the sub rows to results except last row
            rows = rows.concat(subGroups.rows.slice(0, subGroups.rows.length - 1));
          } // move reference to last row


          rowStartCharIndex = rowStartCharIndex + subGroups.lastRowStartCharIndex;
          groupWidth = subGroups.lastRowOffsetLeft;
        }
      }

      rowOffsetLeft += groupWidth;
    }
  } // last row


  if (rowStartCharIndex < text.length) {
    rows.push(text.substring(rowStartCharIndex));
  }

  return {
    rows: rows,
    lastRowStartCharIndex: rowStartCharIndex,
    lastRowOffsetLeft: rowOffsetLeft
  };
}
/* eslint-enable max-statements, complexity, max-depth */


export function autoWrapping(text, wordBreak, maxWidth, iconMapping) {
  if (wordBreak === 'break-all') {
    return breakAll(text, maxWidth, iconMapping);
  }

  return breakWord(text, maxWidth, iconMapping);
}
export function transformRow(row, iconMapping, lineHeight, rowOffsetTop) {
  var offsetLeft = 0;
  var rowHeight = 0;
  var characters = [];

  var _iterator2 = _createForOfIteratorHelper(row),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var character = _step2.value;
      var datum = {
        text: character,
        offsetTop: rowOffsetTop,
        offsetLeft: offsetLeft
      };
      var frame = iconMapping[character];

      if (frame) {
        if (!rowHeight) {
          // frame.height should be a constant
          rowHeight = frame.height * lineHeight;
        }

        offsetLeft += frame.width;
      } else {
        log.warn("Missing character: ".concat(character))();
        offsetLeft += MISSING_CHAR_WIDTH;
      }

      characters.push(datum);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return {
    characters: characters,
    rowWidth: offsetLeft,
    rowHeight: rowHeight
  };
}
/**
 * Transform a text paragraph to an array of characters, each character contains
 * @param paragraph: {String}
 * @param iconMapping {Object} character mapping table for retrieving a character from font atlas
 * @param transformCharacter {Function} callback to transform a single character
 * @param lineHeight {Number} css line-height
 * @param wordBreak {String} css word-break option
 * @param maxWidth {number} css max-width
 * @param transformedData {Array} output transformed data array, each datum contains
 *   - text: character
 *   - index: character index in the paragraph
 *   - offsetLeft: x offset in the row,
 *   - offsetTop: y offset in the paragraph
 *   - size: [width, height] size of the paragraph
 *   - rowSize: [rowWidth, rowHeight] size of the row
 *   - len: length of the paragraph
 */
// eslint-disable-next-line max-params

export function transformParagraph(paragraph, lineHeight, wordBreak, maxWidth, iconMapping, transformCharacter) {
  var transformedData = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];

  if (!paragraph) {
    return;
  }

  var autoWrappingEnabled = (wordBreak === 'break-word' || wordBreak === 'break-all') && isFinite(maxWidth) && maxWidth > 0; // maxWidth and height of the paragraph

  var size = [0, 0];
  var rowOffsetTop = 0;
  var lines = paragraph.split('\n');

  var _iterator3 = _createForOfIteratorHelper(lines),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var line = _step3.value;
      var rows = [line];

      if (autoWrappingEnabled) {
        rows = autoWrapping(line, wordBreak, maxWidth, iconMapping).rows;
      }

      var _iterator4 = _createForOfIteratorHelper(rows),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var row = _step4.value;

          var _transformRow = transformRow(row, iconMapping, lineHeight, rowOffsetTop),
              rowWidth = _transformRow.rowWidth,
              rowHeight = _transformRow.rowHeight,
              characters = _transformRow.characters;

          var rowSize = [rowWidth, rowHeight];

          var _iterator5 = _createForOfIteratorHelper(characters),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var datum = _step5.value;
              datum.size = size;
              datum.rowSize = rowSize;
              transformedData.push(transformCharacter(datum));
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          rowOffsetTop = rowOffsetTop + rowHeight;
          size[0] = autoWrappingEnabled ? maxWidth : Math.max(size[0], rowWidth);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    } // last row

  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  size[1] = rowOffsetTop;
} // Assume data array is sorted by <accessor>
// Replaces the specified range with a new subarray
// Mutates the data array
// Returns {startRow, endRow} of the inserted items

export function replaceInRange(_ref2) {
  var data = _ref2.data,
      getIndex = _ref2.getIndex,
      dataRange = _ref2.dataRange,
      replace = _ref2.replace;
  var _dataRange$startRow = dataRange.startRow,
      startRow = _dataRange$startRow === void 0 ? 0 : _dataRange$startRow,
      _dataRange$endRow = dataRange.endRow,
      endRow = _dataRange$endRow === void 0 ? Infinity : _dataRange$endRow;
  var count = data.length;
  var replaceStart = count;
  var replaceEnd = count;

  for (var i = 0; i < count; i++) {
    var row = getIndex(data[i]);

    if (replaceStart > i && row >= startRow) {
      replaceStart = i;
    }

    if (row >= endRow) {
      replaceEnd = i;
      break;
    }
  }

  var index = replaceStart;
  var dataLengthChanged = replaceEnd - replaceStart !== replace.length; // Save the items after replaceEnd before we overwrite data

  var endChunk = dataLengthChanged && data.slice(replaceEnd); // Insert new items

  for (var _i = 0; _i < replace.length; _i++) {
    data[index++] = replace[_i];
  }

  if (dataLengthChanged) {
    // Append items after replaceEnd
    for (var _i2 = 0; _i2 < endChunk.length; _i2++) {
      data[index++] = endChunk[_i2];
    } // Trim additional items


    data.length = index;
  }

  return {
    startRow: replaceStart,
    endRow: replaceStart + replace.length
  };
}