export default `\
#define SHADER_NAME light-side-layer-fragment

precision highp float;

varying vec4 vColor;
varying float isValid;

uniform sampler2D uTexture;
uniform bool isTexture;
uniform float opacity;
varying vec2 vUV;

void main(void) {
  if (isValid < 0.5) {
    discard;
  }
  vec4 colors = isTexture ? texture2D(uTexture, vUV.xy) : vColor;
  gl_FragColor = colors;
}
`;