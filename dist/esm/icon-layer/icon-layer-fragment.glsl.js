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
export default "#define SHADER_NAME icon-layer-fragment-shader\n\nprecision highp float;\n\nuniform float opacity;\nuniform sampler2D iconsTexture;\nuniform float alphaCutoff;\n\nvarying float vColorMode;\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\nvarying vec2 uv;\n\nvoid main(void) {\n  geometry.uv = uv;\n\n  vec4 texColor = texture2D(iconsTexture, vTextureCoords);\n\n  // if colorMode == 0, use pixel color from the texture\n  // if colorMode == 1 or rendering picking buffer, use texture as transparency mask\n  vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);\n  // Take the global opacity and the alpha from vColor into account for the alpha component\n  float a = texColor.a * opacity * vColor.a;\n\n  if (a < alphaCutoff) {\n    discard;\n  }\n\n  gl_FragColor = vec4(color, a);\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";