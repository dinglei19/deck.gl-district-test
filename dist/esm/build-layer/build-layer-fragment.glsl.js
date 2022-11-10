var getFragment = function getFragment() {
  return "  precision highp float;\n\n  varying vec4 vColor;\n  varying float isValid;\n\n  uniform vec3 project_uCameraPosition;\n\n  vec4 aColor;\n\n  void main(void) {\n    if (isValid < 0.5) {\n      discard;\n    }\n    gl_FragColor = vColor;\n\n    DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n  }";
};

export default getFragment;