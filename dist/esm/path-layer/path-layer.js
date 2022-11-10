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
import { Layer, project32, picking, log } from '@deck.gl/core';
import GL from '@luma.gl/constants';
import { Model, Geometry } from '@luma.gl/core';
import PathTesselator from "./path-tesselator";
import vs from "./path-layer-vertex.glsl";
import fs from "./path-layer-fragment.glsl";
var DEFAULT_COLOR = [0, 0, 0, 255];
var defaultProps = {
  widthUnits: 'meters',
  widthScale: {
    type: 'number',
    min: 0,
    value: 1
  },
  // stroke width in meters
  widthMinPixels: {
    type: 'number',
    min: 0,
    value: 0
  },
  //  min stroke width in pixels
  widthMaxPixels: {
    type: 'number',
    min: 0,
    value: Number.MAX_SAFE_INTEGER
  },
  // max stroke width in pixels
  rounded: false,
  miterLimit: {
    type: 'number',
    min: 0,
    value: 4
  },
  billboard: false,
  // `loop` or `open`
  _pathType: null,
  getPath: {
    type: 'accessor',
    value: function value(object) {
      return object.path;
    }
  },
  getHeight: {
    type: 'accessor',
    value: 0
  },
  getColor: {
    type: 'accessor',
    value: DEFAULT_COLOR
  },
  getWidth: {
    type: 'accessor',
    value: 1
  }
};
var ATTRIBUTE_TRANSITION = {
  enter: function enter(value, chunk) {
    return chunk.length ? chunk.subarray(chunk.length - value.length) : value;
  }
};

var PathLayer = /*#__PURE__*/function (_Layer) {
  _inherits(PathLayer, _Layer);

  var _super = _createSuper(PathLayer);

  function PathLayer() {
    _classCallCheck(this, PathLayer);

    return _super.apply(this, arguments);
  }

  _createClass(PathLayer, [{
    key: "getShaders",
    value: function getShaders() {
      return _get(_getPrototypeOf(PathLayer.prototype), "getShaders", this).call(this, {
        vs: vs,
        fs: fs,
        modules: [project32, picking]
      });
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      var _this = this;

      var noAlloc = true;
      var attributeManager = this.getAttributeManager();
      /* eslint-disable max-len */

      attributeManager.addInstanced({
        positions: {
          size: 3,
          // Start filling buffer from 1 vertex in
          vertexOffset: 1,
          type: GL.DOUBLE,
          fp64: this.use64bitPositions(),
          transition: ATTRIBUTE_TRANSITION,
          accessor: 'getPath',
          update: this.calculatePositions,
          noAlloc: noAlloc,
          shaderAttributes: {
            instanceLeftPositions: {
              vertexOffset: 0
            },
            instanceStartPositions: {
              vertexOffset: 1
            },
            instanceEndPositions: {
              vertexOffset: 2
            },
            instanceRightPositions: {
              vertexOffset: 3
            }
          }
        },
        instanceTypes: {
          size: 1,
          type: GL.UNSIGNED_BYTE,
          update: this.calculateSegmentTypes,
          noAlloc: noAlloc
        },
        instanceStrokeWidths: {
          size: 1,
          accessor: 'getWidth',
          transition: ATTRIBUTE_TRANSITION,
          defaultValue: 1
        },
        instanceColors: {
          size: this.props.colorFormat.length,
          type: GL.UNSIGNED_BYTE,
          normalized: true,
          accessor: 'getColor',
          transition: ATTRIBUTE_TRANSITION,
          defaultValue: DEFAULT_COLOR
        },
        instancePickingColors: {
          size: 3,
          type: GL.UNSIGNED_BYTE,
          accessor: function accessor(object, _ref) {
            var index = _ref.index,
                value = _ref.target;
            return _this.encodePickingColor(object && object.__source ? object.__source.index : index, value);
          }
        }
      });
      /* eslint-enable max-len */

      this.setState({
        pathTesselator: new PathTesselator({
          fp64: this.use64bitPositions(),
          height: this.props.height ? this.props.height : 0
        })
      });

      if (this.props.getDashArray && !this.props.extensions.length) {
        log.removed('getDashArray', 'PathStyleExtension')();
      }
    }
  }, {
    key: "updateState",
    value: function updateState(_ref2) {
      var oldProps = _ref2.oldProps,
          props = _ref2.props,
          changeFlags = _ref2.changeFlags;

      _get(_getPrototypeOf(PathLayer.prototype), "updateState", this).call(this, {
        props: props,
        oldProps: oldProps,
        changeFlags: changeFlags
      });

      var attributeManager = this.getAttributeManager();
      var geometryChanged = changeFlags.dataChanged || changeFlags.updateTriggersChanged && (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getPath);

      if (geometryChanged) {
        var pathTesselator = this.state.pathTesselator;
        var buffers = props.data.attributes || {};
        pathTesselator.updateGeometry({
          data: props.data,
          getHeight: props.getHeight,
          geometryBuffer: buffers.getPath,
          buffers: buffers,
          normalize: !props._pathType,
          loop: props._pathType === 'loop',
          getGeometry: props.getPath,
          positionFormat: props.positionFormat,
          dataChanged: changeFlags.dataChanged
        });
        this.setState({
          numInstances: pathTesselator.instanceCount,
          startIndices: pathTesselator.vertexStarts
        });

        if (!changeFlags.dataChanged) {
          // Base `layer.updateState` only invalidates all attributes on data change
          // Cover the rest of the scenarios here
          attributeManager.invalidateAll();
        }
      }

      if (changeFlags.extensionsChanged) {
        var gl = this.context.gl;

        if (this.state.model) {
          this.state.model.delete();
        }

        this.setState({
          model: this._getModel(gl)
        });
        attributeManager.invalidateAll();
      }
    }
  }, {
    key: "getPickingInfo",
    value: function getPickingInfo(params) {
      var info = _get(_getPrototypeOf(PathLayer.prototype), "getPickingInfo", this).call(this, params);

      var object = info.object,
          index = info.index;

      if (object && object.__source) {
        // data is wrapped
        info.object = this.props.data.find(function (d) {
          return d.__source.index === index;
        });
      }

      return info;
    }
  }, {
    key: "draw",
    value: function draw(_ref3) {
      var uniforms = _ref3.uniforms;
      var viewport = this.context.viewport;
      var _this$props = this.props,
          rounded = _this$props.rounded,
          billboard = _this$props.billboard,
          miterLimit = _this$props.miterLimit,
          widthUnits = _this$props.widthUnits,
          widthScale = _this$props.widthScale,
          widthMinPixels = _this$props.widthMinPixels,
          widthMaxPixels = _this$props.widthMaxPixels;
      var _this$state$show = this.state.show,
          show = _this$state$show === void 0 ? true : _this$state$show;
      var widthMultiplier = widthUnits === 'pixels' ? viewport.metersPerPixel : 1;

      if (show) {
        this.state.model.setUniforms(_objectSpread(_objectSpread({}, uniforms), {}, {
          jointType: Number(rounded),
          billboard: billboard,
          widthScale: widthScale * widthMultiplier,
          miterLimit: miterLimit,
          widthMinPixels: widthMinPixels,
          widthMaxPixels: widthMaxPixels
        })).draw();
      }
    }
  }, {
    key: "_getModel",
    value: function _getModel(gl) {
      /*
       *       _
       *        "-_ 1                   3                       5
       *     _     "o---------------------o-------------------_-o
       *       -   / ""--..__              '.             _.-' /
       *   _     "@- - - - - ""--..__- - - - x - - - -_.@'    /
       *    "-_  /                   ""--..__ '.  _,-` :     /
       *       "o----------------------------""-o'    :     /
       *      0,2                            4 / '.  :     /
       *                                      /   '.:     /
       *                                     /     :'.   /
       *                                    /     :  ', /
       *                                   /     :     o
       */
      var SEGMENT_INDICES = [// start corner
      0, 2, 1, // body
      1, 2, 4, 1, 4, 3, // end corner
      3, 4, 5]; // [0] position on segment - 0: start, 1: end
      // [1] side of path - -1: left, 0: center (joint), 1: right

      var SEGMENT_POSITIONS = [// bevel start corner
      0, 0, // start inner corner
      0, -1, // start outer corner
      0, 1, // end inner corner
      1, -1, // end outer corner
      1, 1, // bevel end corner
      1, 0];
      return new Model(gl, _objectSpread(_objectSpread({}, this.getShaders()), {}, {
        id: this.props.id,
        geometry: new Geometry({
          drawMode: GL.TRIANGLES,
          attributes: {
            indices: new Uint16Array(SEGMENT_INDICES),
            positions: {
              value: new Float32Array(SEGMENT_POSITIONS),
              size: 2
            }
          }
        }),
        isInstanced: true
      }));
    }
  }, {
    key: "calculatePositions",
    value: function calculatePositions(attribute) {
      var pathTesselator = this.state.pathTesselator;
      attribute.startIndices = pathTesselator.vertexStarts;
      attribute.value = pathTesselator.get('positions');
    }
  }, {
    key: "calculateSegmentTypes",
    value: function calculateSegmentTypes(attribute) {
      var pathTesselator = this.state.pathTesselator;
      attribute.startIndices = pathTesselator.vertexStarts;
      attribute.value = pathTesselator.get('segmentTypes');
    }
  }]);

  return PathLayer;
}(Layer);

export { PathLayer as default };
PathLayer.layerName = 'PathLayer';
PathLayer.defaultProps = defaultProps;