function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { CompositeLayer } from '@deck.gl/core';
import { load } from '@loaders.gl/core';
import { JSONLoader } from '@loaders.gl/json';
import BuildLayer from "../build-layer/index";
import PathLayer from "../path-layer/path-layer";
import TextLayer from "../text-layer/text-layer";
import ImageLayer from "../image-layer/index";
import { getGeojsonFeatures, separateGeojsonFeatures } from "./geojson";
import LightSideLayer from "../light-side-layer/index";
var defaultLineColor = [0, 0, 0, 255];
var defaultFillColor = [0, 0, 0, 255];
var defaultProps = {
  // Text properties
  fontFamily: 'Monaco, monospace',
  fontWeight: 'normal',
  // Text accessors
  getText: {
    type: 'accessor',
    value: function value(x) {
      return x.text;
    }
  },
  getTextSize: {
    type: 'accessor',
    value: 12
  },
  getTextColor: {
    type: 'accessor',
    value: [0, 0, 0, 255]
  },
  // fill
  getFillColor: {
    type: 'accessor',
    value: defaultFillColor
  },
  elevationScale: 1,
  getElevation: {
    type: 'accessor',
    value: 0
  },
  gradient: [1, 1],
  // outline
  lineWidthUnits: 'meters',
  outline: true,
  outlineWidth: 1,
  outlineColor: defaultLineColor,
  outlineHeght: 0,
  // inline
  inline: true,
  inlineWidth: 1,
  inlineColor: defaultLineColor,
  // Shared accessors
  getPosition: {
    type: 'accessor',
    value: function value(x) {
      return x.position;
    }
  },
  getHeight: {
    type: 'accessor',
    value: 0
  }
};

function getCoordinates(f) {
  return f.geometry.coordinates;
}

function getPath(f) {
  return f.geometry.coordinates[0];
}

var DistrictLayer = /*#__PURE__*/function (_CompositeLayer) {
  _inherits(DistrictLayer, _CompositeLayer);

  var _super = _createSuper(DistrictLayer);

  function DistrictLayer() {
    _classCallCheck(this, DistrictLayer);

    return _super.apply(this, arguments);
  }

  _createClass(DistrictLayer, [{
    key: "initializeState",
    value: function initializeState() {
      this.state = {
        districtFeature: [],
        districtFullFeature: [],
        textFeature: []
      };
    }
  }, {
    key: "updateState",
    value: function updateState(_ref) {
      var _this = this;

      var props = _ref.props,
          changeFlags = _ref.changeFlags;

      if (!changeFlags.dataChanged) {
        return;
      }

      var _props$url = props.url,
          url = _props$url === void 0 ? [] : _props$url;
      var loads = [];

      if (Array.isArray(url)) {
        url.map(function (urlitem) {
          loads.push(load(urlitem, JSONLoader));
        });
        Promise.all(loads).then(function (geojsonArray) {
          _this.handleGeometry(geojsonArray);
        });
      }
    }
  }, {
    key: "handleGeometry",
    value: function handleGeometry() {
      var geojsonArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (geojsonArray.length > 0) {
        var wrapFeature = this.getSubLayerRow.bind(this);
        var districtFeature = separateGeojsonFeatures(getGeojsonFeatures(geojsonArray[1]), wrapFeature).polygonFeatures;
        var districtFullFeature = [];
        var textFeature = [];
        var adcodes = [];

        if (geojsonArray.length === 2) {
          this.mergeData(geojsonArray[0]);
          districtFullFeature = separateGeojsonFeatures(getGeojsonFeatures(geojsonArray[0]), wrapFeature).polygonFeatures;
        }

        if (districtFullFeature.length > 0) {
          districtFullFeature.forEach(function (item) {
            // eslint-disable-next-line no-underscore-dangle
            var adcode = item.__source.object.properties.adcode;

            if (adcodes.indexOf(adcode) === -1) {
              adcodes.push(adcode);
              textFeature.push({
                center: item.__source.object.properties.center,
                name: item.__source.object.properties.name,
                data: item.__source.object.properties.data
              });
            }
          });
        }

        this.setState({
          districtFeature: districtFeature,
          districtFullFeature: districtFullFeature,
          textFeature: textFeature
        });
      }
    }
  }, {
    key: "mergeData",
    value: function mergeData(FeatureCollection) {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$data = _this$props.data,
          data = _this$props$data === void 0 ? [] : _this$props$data,
          _this$props$joinBy = _this$props.joinBy,
          joinBy = _this$props$joinBy === void 0 ? ['adcode', 'adcode'] : _this$props$joinBy;
      var joinByFirst = [];
      data.map(function (item) {
        if (item[joinBy[1]]) joinByFirst.push(item[joinBy[1]]);
      });
      FeatureCollection.features.map(function (item) {
        var result = _this2.findDataItem(data, joinBy, item.properties[joinBy[0]]);

        if (result) {
          item.properties.data = result;
        }
      });
    }
  }, {
    key: "findDataItem",
    value: function findDataItem(data, joinBy, field) {
      var result = false;
      data.map(function (item) {
        if ("".concat(item[joinBy[1]]) === "".concat(field)) result = item;
      });
      return result;
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      var _this$state = this.state,
          districtFeature = _this$state.districtFeature,
          districtFullFeature = _this$state.districtFullFeature,
          textFeature = _this$state.textFeature;
      var _this$props2 = this.props,
          _getFillColor = _this$props2.getFillColor,
          gradient = _this$props2.gradient,
          texture = _this$props2.texture,
          coordinates = _this$props2.coordinates,
          _getHeight = _this$props2.getHeight,
          outline = _this$props2.outline,
          outlineWidth = _this$props2.outlineWidth,
          outlineColor = _this$props2.outlineColor,
          outlineHeight = _this$props2.outlineHeight,
          inline = _this$props2.inline,
          inlineColor = _this$props2.inlineColor,
          inlineWidth = _this$props2.inlineWidth,
          _this$props2$lightSid = _this$props2.lightSide,
          lightSide = _this$props2$lightSid === void 0 ? false : _this$props2$lightSid,
          lightSideTopRatio = _this$props2.lightSideTopRatio,
          lightSideBaseRatio = _this$props2.lightSideBaseRatio,
          opacity = _this$props2.opacity;
      var imageLayer = texture && new ImageLayer({
        id: "".concat(this.props.id, "-background"),
        pickable: false,
        texture: texture,
        coordinates: coordinates
      });
      var buildLayer = new BuildLayer(this.getSubLayerProps({
        id: "".concat(this.props.id, "-extrued"),
        data: districtFeature,
        getPolygon: getCoordinates,
        getElevation: function getElevation(d) {
          return _getHeight(d.__source.object.properties);
        },
        getFillColor: function getFillColor(d) {
          return _getFillColor(d.__source.object.properties);
        },
        opacity: opacity,
        gradient: gradient
      }));
      var inlinePathLayer = inline && new PathLayer(this.getSubLayerProps({
        id: "".concat(this.props.id, "-inlinepath"),
        data: districtFullFeature,
        widthUnits: 'meters',
        pickable: false,
        rounded: true,
        getPath: getPath,
        getHeight: function getHeight(d) {
          return _getHeight(d.__source.object.properties) * 1.005;
        },
        getColor: inlineColor,
        opacity: 1,
        getWidth: inlineWidth
      }));
      var outlinePathLayer = outline && new PathLayer(this.getSubLayerProps({
        id: "".concat(this.props.id, "-outlinepath"),
        data: districtFeature,
        pickable: false,
        widthUnits: 'meters',
        rounded: true,
        getPath: getPath,
        getHeight: outlineHeight,
        getColor: outlineColor,
        opacity: 1,
        getWidth: outlineWidth
      }));
      var lightSideLayer = lightSide && new LightSideLayer(this.getSubLayerProps({
        id: "".concat(this.props.id, "-lightside"),
        data: districtFeature,
        pickable: false,
        getPolygon: getPath,
        getElevation: function getElevation(d) {
          return _getHeight(d);
        },
        getFillColor: function getFillColor(d) {
          return [7, 173, 251];
        },
        getDuration: function getDuration(d) {
          return 5000;
        },
        getTimestamps: function getTimestamps(d) {
          return 23;
        },
        getSpeed: function getSpeed(d) {
          return 5;
        },
        opacity: 0.1,
        baseRatio: lightSideBaseRatio,
        topRatio: lightSideTopRatio
      }));
      var textLayer = new TextLayer(this.getSubLayerProps({
        id: "".concat(this.props.id, "-text"),
        data: textFeature,
        pickable: false,
        sizeScale: 500,
        sizeUnits: 'meters',
        getPosition: function getPosition(d) {
          return [d.center[0], d.center[1], _getHeight(d) * 1.005];
        },
        getText: function getText(d) {
          return d.name;
        },
        getColor: [255, 255, 255],
        getSize: 40,
        billboard: false,
        opacity: 1,
        fontWeight: 'bold',
        fontFamily: 'Monaco, monospace'
      }));
      return [imageLayer, buildLayer, inlinePathLayer, outlinePathLayer, lightSideLayer, textLayer];
    }
  }]);

  return DistrictLayer;
}(CompositeLayer);

export { DistrictLayer as default };
DistrictLayer.defaultProps = defaultProps;
DistrictLayer.layerName = 'DistrictLayer';