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
export default "#define SHADER_NAME multi-icon-layer-fragment-shader\n\nprecision highp float;\n\nuniform sampler2D iconsTexture;\nuniform float buffer;\nuniform bool sdf;\nuniform float alphaCutoff;\nuniform bool shouldDrawBackground;\nuniform vec3 backgroundColor;\n\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\nvarying float vGamma;\nvarying vec2 uv;\n\nvoid main(void) {\n  geometry.uv = uv;\n\n  float alpha = texture2D(iconsTexture, vTextureCoords).a;\n\n  // if enable sdf (signed distance fields)\n  if (sdf) {\n    alpha = smoothstep(buffer - vGamma, buffer + vGamma, alpha);\n  }\n\n  // Take the global opacity and the alpha from vColor into account for the alpha component\n  float a = alpha * vColor.a;\n  \n  if (a < alphaCutoff) {\n    // We are now in the background, let's decide what to draw\n    if (shouldDrawBackground && !picking_uActive) {\n      // draw background color and return if not picking\n      gl_FragColor = vec4(backgroundColor, vColor.a);\n      return;\n    } else if (!picking_uActive) {\n      // no background and no picking\n      discard;\n    }\n    // else (picking):\n    // allow picking to work and pick the background (fall-through to DECKGL_FILTER_COLOR)\n  }\n\n  if (shouldDrawBackground) {\n    gl_FragColor = vec4(mix(backgroundColor, vColor.rgb, alpha), vColor.a);\n  } else {\n    gl_FragColor = vec4(vColor.rgb, a);\n  }\n\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";