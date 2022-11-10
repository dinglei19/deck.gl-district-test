function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
import { Tesselator, createIterable } from '@deck.gl/core';
var START_CAP = 1;
var END_CAP = 2;
var INVALID = 4; // This class is set up to allow querying one attribute at a time
// the way the AttributeManager expects it

var PathTesselator = /*#__PURE__*/function (_Tesselator) {
  _inherits(PathTesselator, _Tesselator);

  var _super = _createSuper(PathTesselator);

  function PathTesselator(opts) {
    _classCallCheck(this, PathTesselator);

    opts.getHeight = opts.getHeight || 0;
    opts.heights = [];
    return _super.call(this, _objectSpread(_objectSpread({}, opts), {}, {
      attributes: {
        // Padding covers shaderAttributes for last segment in largest case fp64
        // additional vertex + hi & low parts, 3 * 6
        positions: {
          size: 3,
          padding: 18,
          type: opts.fp64 ? Float64Array : Float32Array
        },
        segmentTypes: {
          size: 1,
          type: Uint8ClampedArray
        }
      }
    }));
  }

  _createClass(PathTesselator, [{
    key: "getGeometryFromBuffer",
    value: function getGeometryFromBuffer(buffer) {
      if (this.normalize) {
        return _get(_getPrototypeOf(PathTesselator.prototype), "getGeometryFromBuffer", this).call(this, buffer);
      } // we don't need to read the positions if no normalization


      return function () {
        return null;
      };
    }
    /* Getters */

  }, {
    key: "get",
    value: function get(attributeName) {
      return this.attributes[attributeName];
    }
    /* Implement base Tesselator interface */

  }, {
    key: "getGeometrySize",
    value: function getGeometrySize(path) {
      if (!this.normalize) {
        var _numPoints = path.length / this.positionSize;

        return this.opts.loop ? _numPoints + 2 : _numPoints;
      }

      var numPoints = this.getPathLength(path);

      if (numPoints < 2) {
        // invalid path
        return 0;
      }

      if (this.isClosed(path)) {
        // minimum 3 vertices
        return numPoints < 3 ? 0 : numPoints + 2;
      }

      return numPoints;
    }
  }, {
    key: "updateGeometryAttributes",
    value: function updateGeometryAttributes(path, context) {
      if (context.geometrySize === 0) {
        return;
      }

      this._updateSegmentTypes(path, context);

      this._updatePositions(path, context);
    }
  }, {
    key: "_updateSegmentTypes",
    value: function _updateSegmentTypes(path, context) {
      var segmentTypes = this.attributes.segmentTypes;
      var isPathClosed = this.isClosed(path);
      var vertexStart = context.vertexStart,
          geometrySize = context.geometrySize; // positions   --  A0 A1 B0 B1 B2 B3 B0 B1 B2 --
      // segmentTypes     3  4  4  0  0  0  0  4  4

      segmentTypes.fill(0, vertexStart, vertexStart + geometrySize);

      if (isPathClosed) {
        segmentTypes[vertexStart] = INVALID;
        segmentTypes[vertexStart + geometrySize - 2] = INVALID;
      } else {
        segmentTypes[vertexStart] += START_CAP;
        segmentTypes[vertexStart + geometrySize - 2] += END_CAP;
      }

      segmentTypes[vertexStart + geometrySize - 1] = INVALID;
    }
  }, {
    key: "_updatePositions",
    value: function _updatePositions(path, context) {
      var positions = this.attributes.positions;

      if (!positions) {
        return;
      }

      var vertexStart = context.vertexStart,
          geometrySize = context.geometrySize,
          geometryIndex = context.geometryIndex;
      var heights = this.opts.heights;
      var height = heights[geometryIndex] ? heights[geometryIndex] : 0; // positions   --  A0 A1 B0 B1 B2 B3 B0 B1 B2 --
      // segmentTypes     3  4  4  0  0  0  0  4  4

      for (var i = vertexStart, ptIndex = 0; ptIndex < geometrySize; i++, ptIndex++) {
        var p = this.getPointOnPath(path, ptIndex);
        positions[i * 3] = p[0];
        positions[i * 3 + 1] = p[1];
        positions[i * 3 + 2] = p[2] || height;
      }
    }
  }, {
    key: "_forEachGeometry",
    value: function _forEachGeometry(visitor, startRow, endRow) {
      var data = this.data,
          getGeometry = this.getGeometry,
          opts = this.opts;

      var _createIterable = createIterable(data, startRow, endRow),
          iterable = _createIterable.iterable,
          objectInfo = _createIterable.objectInfo;

      var _iterator = _createForOfIteratorHelper(iterable),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var object = _step.value;
          objectInfo.index++;
          var geometry = getGeometry(object, objectInfo);

          if (typeof opts.getHeight === 'function') {
            opts.heights.push(opts.getHeight(object));
          } else {
            opts.heights.push(opts.getHeight);
          }

          visitor(geometry, objectInfo.index);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /* Utilities */

  }, {
    key: "getPathLength",
    value: function getPathLength(path) {
      if (Number.isFinite(path[0])) {
        // flat format
        return path.length / this.positionSize;
      }

      return path.length;
    }
  }, {
    key: "getPointOnPath",
    value: function getPointOnPath(path, index) {
      if (Number.isFinite(path[0])) {
        // flat format
        var positionSize = this.positionSize;

        if (index * positionSize >= path.length) {
          // loop
          index += 1 - path.length / positionSize;
        } // TODO - avoid creating new arrays when using binary


        return [path[index * positionSize], path[index * positionSize + 1], positionSize === 3 ? path[index * positionSize + 2] : 0];
      }

      if (index >= path.length) {
        // loop
        index += 1 - path.length;
      }

      return path[index];
    }
  }, {
    key: "isClosed",
    value: function isClosed(path) {
      if (!this.normalize) {
        return this.opts.loop;
      }

      var numPoints = this.getPathLength(path);
      var firstPoint = this.getPointOnPath(path, 0);
      var lastPoint = this.getPointOnPath(path, numPoints - 1);
      return firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1] && firstPoint[2] === lastPoint[2];
    }
  }]);

  return PathTesselator;
}(Tesselator);

export { PathTesselator as default };