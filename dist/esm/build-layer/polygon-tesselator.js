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
// Handles tesselation of polygons with holes
// - 2D surfaces
// - 2D outlines
// - 3D surfaces (top and sides only)
// - 3D wireframes (not yet)
import { Tesselator } from '@deck.gl/core';
import * as Polygon from "./polygon"; // This class is set up to allow querying one attribute at a time
// the way the AttributeManager expects it

var PolygonTesselator = /*#__PURE__*/function (_Tesselator) {
  _inherits(PolygonTesselator, _Tesselator);

  var _super = _createSuper(PolygonTesselator);

  function PolygonTesselator(opts) {
    _classCallCheck(this, PolygonTesselator);

    var fp64 = opts.fp64,
        _opts$IndexType = opts.IndexType,
        IndexType = _opts$IndexType === void 0 ? Uint32Array : _opts$IndexType;
    return _super.call(this, _objectSpread(_objectSpread({}, opts), {}, {
      attributes: {
        positions: {
          size: 3,
          type: fp64 ? Float64Array : Float32Array
        },
        vertexValid: {
          type: Uint8ClampedArray,
          size: 1
        },
        indices: {
          type: IndexType,
          size: 1
        }
      }
    }));
  }
  /* Getters */


  _createClass(PolygonTesselator, [{
    key: "get",
    value: function get(attributeName) {
      var attributes = this.attributes;

      if (attributeName === 'indices') {
        return attributes.indices && attributes.indices.subarray(0, this.vertexCount);
      }

      return attributes[attributeName];
    }
    /* Implement base Tesselator interface */

  }, {
    key: "updateGeometry",
    value: function updateGeometry(opts) {
      _get(_getPrototypeOf(PolygonTesselator.prototype), "updateGeometry", this).call(this, opts);

      var externalIndices = this.buffers.indices;

      if (externalIndices) {
        this.vertexCount = (externalIndices.value || externalIndices).length;
      }
    }
  }, {
    key: "getGeometrySize",
    value: function getGeometrySize(polygon) {
      return Polygon.getVertexCount(polygon, this.positionSize, this.normalize);
    }
  }, {
    key: "getGeometryFromBuffer",
    value: function getGeometryFromBuffer(buffer) {
      var getGeometry = _get(_getPrototypeOf(PolygonTesselator.prototype), "getGeometryFromBuffer", this).call(this, buffer);

      if (this.normalize || !this.buffers.indices) {
        return getGeometry;
      } // we don't need to read the positions if no normalization/tesselation


      return function () {
        return null;
      };
    }
  }, {
    key: "updateGeometryAttributes",
    value: function updateGeometryAttributes(polygon, context) {
      if (this.normalize) {
        polygon = Polygon.normalize(polygon, this.positionSize, context.geometrySize);
      }

      this._updateIndices(polygon, context);

      this._updatePositions(polygon, context);

      this._updateVertexValid(polygon, context);
    } // Flatten the indices array

  }, {
    key: "_updateIndices",
    value: function _updateIndices(polygon, _ref) {
      var geometryIndex = _ref.geometryIndex,
          offset = _ref.vertexStart,
          indexStart = _ref.indexStart;
      var attributes = this.attributes,
          indexStarts = this.indexStarts,
          typedArrayManager = this.typedArrayManager;
      var target = attributes.indices;

      if (!target) {
        return;
      }

      var i = indexStart; // 1. get triangulated indices for the internal areas

      var indices = Polygon.getSurfaceIndices(polygon, this.positionSize); // make sure the buffer is large enough

      target = typedArrayManager.allocate(target, indexStart + indices.length, {
        copy: true
      }); // 2. offset each index by the number of indices in previous polygons

      for (var j = 0; j < indices.length; j++) {
        target[i++] = indices[j] + offset;
      }

      indexStarts[geometryIndex + 1] = indexStart + indices.length;
      attributes.indices = target;
    } // Flatten out all the vertices of all the sub subPolygons

  }, {
    key: "_updatePositions",
    value: function _updatePositions(polygon, _ref2) {
      var vertexStart = _ref2.vertexStart,
          geometrySize = _ref2.geometrySize;
      var positions = this.attributes.positions,
          positionSize = this.positionSize;

      if (!positions) {
        return;
      }

      var polygonPositions = polygon.positions || polygon;

      for (var i = vertexStart, j = 0; j < geometrySize; i++, j++) {
        var x = polygonPositions[j * positionSize];
        var y = polygonPositions[j * positionSize + 1];
        var z = positionSize > 2 ? polygonPositions[j * positionSize + 2] : 0;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }
    }
  }, {
    key: "_updateVertexValid",
    value: function _updateVertexValid(polygon, _ref3) {
      var vertexStart = _ref3.vertexStart,
          geometrySize = _ref3.geometrySize;
      var vertexValid = this.attributes.vertexValid,
          positionSize = this.positionSize;
      var holeIndices = polygon && polygon.holeIndices;
      /* We are reusing the some buffer for `nextPositions` by offseting one vertex
       * to the left. As a result,
       * the last vertex of each ring overlaps with the first vertex of the next ring.
       * `vertexValid` is used to mark the end of each ring so we don't draw these
       * segments:
        positions      A0 A1 A2 A3 A4 B0 B1 B2 C0 ...
        nextPositions  A1 A2 A3 A4 B0 B1 B2 C0 C1 ...
        vertexValid    1  1  1  1  0  1  1  0  1 ...
       */

      vertexValid.fill(1, vertexStart, vertexStart + geometrySize);

      if (holeIndices) {
        for (var j = 0; j < holeIndices.length; j++) {
          vertexValid[vertexStart + holeIndices[j] / positionSize - 1] = 0;
        }
      }

      vertexValid[vertexStart + geometrySize - 1] = 0;
    }
  }]);

  return PolygonTesselator;
}(Tesselator);

export { PolygonTesselator as default };