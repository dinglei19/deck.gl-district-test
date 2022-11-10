function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

/* eslint-disable max-params */
import earcut from 'earcut'; // For Web Mercator projection

var PI_4 = Math.PI / 4;
var DEGREES_TO_RADIANS_HALF = Math.PI / 360; // 4 data formats are supported:
// Simple Polygon: an array of points
// Complex Polygon: an array of array of points (array of rings)
//   with the first ring representing the outer hull and other rings representing holes
// Simple Flat: an array of numbers (flattened "simple polygon")
// Complex Flat: {position: array<number>, holeIndices: array<number>}
//   (flattened "complex polygon")

/**
 * Ensure a polygon is valid format
 * @param {Array|Object} polygon
 */

function validate(polygon) {
  polygon = polygon && polygon.positions || polygon;

  if (!Array.isArray(polygon) && !ArrayBuffer.isView(polygon)) {
    throw new Error('invalid polygon');
  }
}
/**
 * Check if a polygon is simple or complex
 * @param {Array} polygon - either a complex or simple polygon
 * @return {Boolean} - true if the polygon is a simple polygon (i.e. not an array of polygons)
 */


function isSimple(polygon) {
  return polygon.length >= 1 && polygon[0].length >= 2 && Number.isFinite(polygon[0][0]);
}
/**
 * Check if a simple polygon is a closed ring
 * @param {Array} simplePolygon - array of points
 * @return {Boolean} - true if the simple polygon is a closed ring
 */


function isNestedRingClosed(simplePolygon) {
  // check if first and last vertex are the same
  var p0 = simplePolygon[0];
  var p1 = simplePolygon[simplePolygon.length - 1];
  return p0[0] === p1[0] && p0[1] === p1[1] && p0[2] === p1[2];
}
/**
 * Check if a simple flat array is a closed ring
 * @param {Array} positions - array of numbers
 * @param {Number} size - size of a position, 2 (xy) or 3 (xyz)
 * @param {Number} startIndex - start index of the path in the positions array
 * @param {Number} endIndex - end index of the path in the positions array
 * @return {Boolean} - true if the simple flat array is a closed ring
 */


function isFlatRingClosed(positions, size, startIndex, endIndex) {
  for (var i = 0; i < size; i++) {
    if (positions[startIndex + i] !== positions[endIndex - size + i]) {
      return false;
    }
  }

  return true;
}
/**
 * Copy a simple polygon coordinates into a flat array, closes the ring if needed.
 * @param {Float64Array} target - destination
 * @param {Number} targetStartIndex - index in the destination to start copying into
 * @param {Array} simplePolygon - array of points
 * @param {Number} size - size of a position, 2 (xy) or 3 (xyz)
 * @returns {Number} - the index of the write head in the destination
 */


function copyNestedRing(target, targetStartIndex, simplePolygon, size) {
  var targetIndex = targetStartIndex;
  var len = simplePolygon.length;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < size; j++) {
      target[targetIndex++] = simplePolygon[i][j] || 0;
    }
  }

  if (!isNestedRingClosed(simplePolygon)) {
    for (var _j = 0; _j < size; _j++) {
      target[targetIndex++] = simplePolygon[0][_j] || 0;
    }
  }

  return targetIndex;
}
/**
 * Copy a simple flat array into another flat array, closes the ring if needed.
 * @param {Float64Array} target - destination
 * @param {Number} targetStartIndex - index in the destination to start copying into
 * @param {Array} positions - array of numbers
 * @param {Number} size - size of a position, 2 (xy) or 3 (xyz)
 * @param {Number} [srcStartIndex] - start index of the path in the positions array
 * @param {Number} [srcEndIndex] - end index of the path in the positions array
 * @returns {Number} - the index of the write head in the destination
 */


function copyFlatRing(target, targetStartIndex, positions, size) {
  var srcStartIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var srcEndIndex = arguments.length > 5 ? arguments[5] : undefined;
  srcEndIndex = srcEndIndex || positions.length;
  var srcLength = srcEndIndex - srcStartIndex;

  if (srcLength <= 0) {
    return targetStartIndex;
  }

  var targetIndex = targetStartIndex;

  for (var i = 0; i < srcLength; i++) {
    target[targetIndex++] = positions[srcStartIndex + i];
  }

  if (!isFlatRingClosed(positions, size, srcStartIndex, srcEndIndex)) {
    for (var _i = 0; _i < size; _i++) {
      target[targetIndex++] = positions[srcStartIndex + _i];
    }
  }

  return targetIndex;
}
/**
 * Counts the number of vertices in a simple polygon, closes the polygon if needed.
 * @param {Array} simplePolygon - array of points
 * @returns {Number} vertex count
 */


function getNestedVertexCount(simplePolygon) {
  return (isNestedRingClosed(simplePolygon) ? 0 : 1) + simplePolygon.length;
}
/**
 * Counts the number of vertices in a simple flat array, closes the polygon if needed.
 * @param {Array} positions - array of numbers
 * @param {Number} size - size of a position, 2 (xy) or 3 (xyz)
 * @param {Number} [startIndex] - start index of the path in the positions array
 * @param {Number} [endIndex] - end index of the path in the positions array
 * @returns {Number} vertex count
 */


function getFlatVertexCount(positions, size) {
  var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var endIndex = arguments.length > 3 ? arguments[3] : undefined;
  endIndex = endIndex || positions.length;

  if (startIndex >= endIndex) {
    return 0;
  }

  return (isFlatRingClosed(positions, size, startIndex, endIndex) ? 0 : 1) + (endIndex - startIndex) / size;
}
/**
 * Counts the number of vertices in any polygon representation.
 * @param {Array|Object} polygon
 * @param {Number} positionSize - size of a position, 2 (xy) or 3 (xyz)
 * @returns {Number} vertex count
 */


export function getVertexCount(polygon, positionSize) {
  var normalization = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!normalization) {
    polygon = polygon.positions || polygon;
    return polygon.length / positionSize;
  }

  validate(polygon);

  if (polygon.positions) {
    // complex flat
    var _polygon = polygon,
        positions = _polygon.positions,
        holeIndices = _polygon.holeIndices;

    if (holeIndices) {
      var vertexCount = 0; // split the positions array into `holeIndices.length + 1` rings
      // holeIndices[-1] falls back to 0
      // holeIndices[holeIndices.length] falls back to positions.length

      for (var i = 0; i <= holeIndices.length; i++) {
        vertexCount += getFlatVertexCount(polygon.positions, positionSize, holeIndices[i - 1], holeIndices[i]);
      }

      return vertexCount;
    }

    polygon = positions;
  }

  if (Number.isFinite(polygon[0])) {
    // simple flat
    return getFlatVertexCount(polygon, positionSize);
  }

  if (!isSimple(polygon)) {
    // complex polygon
    var _vertexCount = 0; // eslint-disable-next-line no-restricted-syntax

    var _iterator = _createForOfIteratorHelper(polygon),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var simplePolygon = _step.value;
        _vertexCount += getNestedVertexCount(simplePolygon);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return _vertexCount;
  } // simple polygon


  return getNestedVertexCount(polygon);
}
/**
 * Normalize any polygon representation into the "complex flat" format
 * @param {Array|Object} polygon
 * @param {Number} positionSize - size of a position, 2 (xy) or 3 (xyz)
 * @param {Number} [vertexCount] - pre-computed vertex count in the polygon.
 *   If provided, will skip counting.
 * @return {Object} - {positions: <Float64Array>, holeIndices: <Array|null>}
 */

/* eslint-disable max-statements */

export function normalize(polygon, positionSize, vertexCount) {
  validate(polygon);
  vertexCount = vertexCount || getVertexCount(polygon, positionSize);
  var positions = new Float64Array(vertexCount * positionSize);
  var holeIndices = [];

  if (polygon.positions) {
    // complex flat
    var _polygon2 = polygon,
        srcPositions = _polygon2.positions,
        srcHoleIndices = _polygon2.holeIndices;

    if (srcHoleIndices) {
      var targetIndex = 0; // split the positions array into `holeIndices.length + 1` rings
      // holeIndices[-1] falls back to 0
      // holeIndices[holeIndices.length] falls back to positions.length

      for (var i = 0; i <= srcHoleIndices.length; i++) {
        targetIndex = copyFlatRing(positions, targetIndex, srcPositions, positionSize, srcHoleIndices[i - 1], srcHoleIndices[i]);
        holeIndices.push(targetIndex);
      } // The last one is not a starting index of a hole, remove


      holeIndices.pop();
      return {
        positions: positions,
        holeIndices: holeIndices
      };
    }

    polygon = srcPositions;
  }

  if (Number.isFinite(polygon[0])) {
    // simple flat
    copyFlatRing(positions, 0, polygon, positionSize);
    return positions;
  }

  if (!isSimple(polygon)) {
    // complex polygon
    var _targetIndex = 0; // eslint-disable-next-line no-restricted-syntax

    var _iterator2 = _createForOfIteratorHelper(polygon),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var simplePolygon = _step2.value;
        _targetIndex = copyNestedRing(positions, _targetIndex, simplePolygon, positionSize);
        holeIndices.push(_targetIndex);
      } // The last one is not a starting index of a hole, remove

    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    holeIndices.pop(); // last index points to the end of the array, remove it

    return {
      positions: positions,
      holeIndices: holeIndices
    };
  } // simple polygon


  copyNestedRing(positions, 0, polygon, positionSize);
  return positions;
}
/* eslint-enable max-statements */

/*
 * Get vertex indices for drawing polygon mesh
 * @param {Object} normalizedPolygon - {positions, holeIndices}
 * @param {Number} positionSize - size of a position, 2 (xy) or 3 (xyz)
 * @returns {Array} array of indices
 */

export function getSurfaceIndices(normalizedPolygon, positionSize, preproject) {
  var holeIndices = null;

  if (normalizedPolygon.holeIndices) {
    holeIndices = normalizedPolygon.holeIndices.map(function (positionIndex) {
      return positionIndex / positionSize;
    });
  }

  var positions = normalizedPolygon.positions || normalizedPolygon; // TODO - handle other coordinate systems and projection modes

  if (preproject) {
    // When tesselating lnglat coordinates, project them to the Web Mercator plane for accuracy
    var n = positions.length; // Clone the array

    positions = positions.slice();

    for (var i = 0; i < n; i += positionSize) {
      // project points to a scaled version of the web-mercator plane
      // It doesn't matter if x and y are scaled/translated, but the relationship must be linear
      var y = positions[i + 1];
      positions[i + 1] = Math.log(Math.tan(PI_4 + y * DEGREES_TO_RADIANS_HALF));
    }
  } // Let earcut triangulate the polygon


  return earcut(positions, holeIndices, positionSize);
}