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
export default "#define SHADER_NAME icon-layer-vertex-shader\n\nattribute vec2 positions;\n\nattribute vec3 instancePositions;\nattribute vec3 instancePositions64Low;\nattribute float instanceSizes;\nattribute float instanceAngles;\nattribute vec4 instanceColors;\nattribute vec3 instancePickingColors;\nattribute vec4 instanceIconFrames;\nattribute float instanceColorModes;\nattribute vec2 instanceOffsets;\n\nuniform float sizeScale;\nuniform vec2 iconsTextureDim;\nuniform float sizeMinPixels;\nuniform float sizeMaxPixels;\nuniform bool billboard;\nuniform float bearing;\nuniform bool isBearing;\n\nvarying float vColorMode;\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\nvarying vec2 uv;\n\nvec2 rotate_by_angle(vec2 vertex, float angle) {\n  float angle_radian = angle * PI / 180.0;\n  float cos_angle = cos(angle_radian);\n  float sin_angle = sin(angle_radian);\n  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);\n  return rotationMatrix * vertex;\n}\n//\u56F4\u7ED5Z\u8F74\u65CB\u8F6C\nvec4 rotate_z_by_angle(vec4 vertex, float angle) {\n  float angle_radian = angle * PI / 180.0;\n  float cos_angle = cos(angle_radian);\n  float sin_angle = sin(angle_radian);\n  mat4 rotationMatrix = mat4(cos_angle,sin_angle,0.0,0.0, -sin_angle,cos_angle,0.0,0.0, 0.0,0.0,1.0,0.0, 0.0,0.0,0.0,1.0);\n  return rotationMatrix * vertex;\n}\n\nvoid main(void) {\n  geometry.worldPosition = instancePositions;\n  geometry.uv = positions;\n  geometry.pickingColor = instancePickingColors;\n  uv = positions;\n\n  vec2 iconSize = instanceIconFrames.zw;\n  // convert size in meters to pixels, then scaled and clamp\n \n  // project meters to pixels and clamp to limits \n  float sizePixels = clamp(\n    project_size_to_pixel(instanceSizes * sizeScale), \n    sizeMinPixels, sizeMaxPixels\n  );\n  // scale icon height to match instanceSize\n  float instanceScale = iconSize.y == 0.0 ? 0.0 : sizePixels / iconSize.y;\n\n  // scale and rotate vertex in \"pixel\" value and convert back to fraction in clipspace\n  vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;\n  pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;\n  pixelOffset.y *= -1.0;\n\n\n  if (billboard) {\n    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0,0.0,0.0), geometry.position);\n    vec3 offset = vec3(pixelOffset, 0.0);\n    DECKGL_FILTER_SIZE(offset, geometry);\n    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);\n  } else {\n    if(isBearing){\n      vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);\n      DECKGL_FILTER_SIZE(offset_common, geometry);\n      //\u6839\u636E\u89C6\u89D2\u89D2\u5EA6\u7ED5Z\u8F74\u65CB\u8F6C\n      vec4 offset_rotate = rotate_z_by_angle(vec4(offset_common.x, 0.0, offset_common.y, 1.0), -bearing);\n      gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_rotate.xyz, geometry.position); \n    } else {\n      vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);\n      DECKGL_FILTER_SIZE(offset_common, geometry);\n      gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position); \n    }\n   \n  }\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  vTextureCoords = mix(\n    instanceIconFrames.xy,\n    instanceIconFrames.xy + iconSize,\n    (positions.xy + 1.0) / 2.0\n  ) / iconsTextureDim;\n\n  vColor = instanceColors;\n  DECKGL_FILTER_COLOR(vColor, geometry);\n\n  vColorMode = instanceColorModes;\n}\n";