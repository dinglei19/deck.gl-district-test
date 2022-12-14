// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
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
import { log } from '@deck.gl/core';
/**
 * Simple GeoJSON validation util. For perf reasons we do not validate against the full spec,
 * only the following:
   - geometry.type is supported
   - geometry.coordinate has correct nesting level
 */

var COORDINATE_NEST_LEVEL = {
  Point: 1,
  MultiPoint: 2,
  LineString: 2,
  MultiLineString: 3,
  Polygon: 3,
  MultiPolygon: 4
};
export function validateGeometry(type, coordinates) {
  var nestLevel = COORDINATE_NEST_LEVEL[type];
  log.assert(nestLevel, "Unknown GeoJSON type ".concat(type));
  var coordinatesTmp = coordinates;

  while (coordinates && --nestLevel > 0) {
    // eslint-disable-next-line prefer-destructuring
    coordinatesTmp = coordinates[0];
  }

  return coordinatesTmp && Number.isFinite(coordinatesTmp[0]);
}

function separateGeometry(geometry, separated, wrapFeature, sourceFeature, sourceFeatureIndex) {
  var type = geometry.type,
      coordinates = geometry.coordinates;
  var pointFeatures = separated.pointFeatures,
      lineFeatures = separated.lineFeatures,
      polygonFeatures = separated.polygonFeatures,
      polygonOutlineFeatures = separated.polygonOutlineFeatures; // if (!validateGeometry(type, coordinates)) {
  //   // Avoid hard failure if some features are malformed
  //   log.warn(`${type} coordinates are malformed`)();
  //   return;
  // }
  // Split each feature, but keep track of the source feature and index (for Multi* geometries)

  switch (type) {
    case 'Point':
      pointFeatures.push(wrapFeature({
        geometry: geometry
      }, sourceFeature, sourceFeatureIndex));
      break;

    case 'MultiPoint':
      coordinates.forEach(function (point) {
        pointFeatures.push(wrapFeature({
          geometry: {
            type: 'Point',
            coordinates: point
          }
        }, sourceFeature, sourceFeatureIndex));
      });
      break;

    case 'LineString':
      lineFeatures.push(wrapFeature({
        geometry: geometry
      }, sourceFeature, sourceFeatureIndex));
      break;

    case 'MultiLineString':
      // Break multilinestrings into multiple lines
      coordinates.forEach(function (path) {
        lineFeatures.push(wrapFeature({
          geometry: {
            type: 'LineString',
            coordinates: path
          }
        }, sourceFeature, sourceFeatureIndex));
      });
      break;

    case 'Polygon':
      polygonFeatures.push(wrapFeature({
        geometry: geometry
      }, sourceFeature, sourceFeatureIndex)); // Break polygon into multiple lines

      coordinates.forEach(function (path) {
        polygonOutlineFeatures.push(wrapFeature({
          geometry: {
            type: 'LineString',
            coordinates: path
          }
        }, sourceFeature, sourceFeatureIndex));
      });
      break;

    case 'MultiPolygon':
      // Break multipolygons into multiple polygons
      coordinates.forEach(function (polygon) {
        polygonFeatures.push(wrapFeature({
          geometry: {
            type: 'Polygon',
            coordinates: polygon
          }
        }, sourceFeature, sourceFeatureIndex)); // Break polygon into multiple lines

        polygon.forEach(function (path) {
          polygonOutlineFeatures.push(wrapFeature({
            geometry: {
              type: 'LineString',
              coordinates: path
            }
          }, sourceFeature, sourceFeatureIndex));
        });
      });
      break;

    default:
  }
}
/**
 * "Normalizes" complete or partial GeoJSON data into iterable list of features
 * Can accept GeoJSON geometry or "Feature", "FeatureCollection" in addition
 * to plain arrays and iterables.
 * Works by extracting the feature array or wrapping single objects in an array,
 * so that subsequent code can simply iterate over features.
 *
 * @param {object} geojson - geojson data
 * @param {Object|Array} data - geojson object (FeatureCollection, Feature or
 *  Geometry) or array of features
 * @return {Array|"iteratable"} - iterable list of features
 */


export function getGeojsonFeatures(geojson) {
  // If array, assume this is a list of features
  if (Array.isArray(geojson)) {
    return geojson;
  }

  log.assert(geojson.type, 'GeoJSON does not have type');

  switch (geojson.type) {
    case 'Feature':
      // Wrap the feature in a 'Features' array
      return [geojson];

    case 'FeatureCollection':
      // Just return the 'Features' array from the collection
      log.assert(Array.isArray(geojson.features), 'GeoJSON does not have features array');
      return geojson.features;

    default:
      // Assume it's a geometry, we'll check type in separateGeojsonFeatures
      // Wrap the geometry object in a 'Feature' object and wrap in an array
      return [{
        geometry: geojson
      }];
  }
} // Linearize

export function separateGeojsonFeatures(features, wrapFeature) {
  var dataRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var separated = {
    pointFeatures: [],
    lineFeatures: [],
    polygonFeatures: [],
    polygonOutlineFeatures: []
  };
  var _dataRange$startRow = dataRange.startRow,
      startRow = _dataRange$startRow === void 0 ? 0 : _dataRange$startRow,
      _dataRange$endRow = dataRange.endRow,
      endRow = _dataRange$endRow === void 0 ? features.length : _dataRange$endRow;

  for (var featureIndex = startRow; featureIndex < endRow; featureIndex++) {
    var feature = features[featureIndex];
    log.assert(feature && feature.geometry, 'GeoJSON does not have geometry');
    var geometry = feature.geometry;

    if (geometry.type === 'GeometryCollection') {
      log.assert(Array.isArray(geometry.geometries), 'GeoJSON does not have geometries array');
      var geometries = geometry.geometries;

      for (var i = 0; i < geometries.length; i++) {
        var subGeometry = geometries[i];
        separateGeometry(subGeometry, separated, wrapFeature, feature, featureIndex);
      }
    } else {
      separateGeometry(geometry, separated, wrapFeature, feature, featureIndex);
    }
  }

  return separated;
}