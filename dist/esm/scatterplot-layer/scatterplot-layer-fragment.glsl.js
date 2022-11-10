export default "#define SHADER_NAME scatterplot-layer-fragment-shader\n\nprecision highp float;\n\nuniform bool filled;\nuniform float stroked;\n\nvarying vec4 vFillColor;\nvarying vec4 vLineColor;\nvarying vec2 unitPosition;\nvarying float innerUnitRadius;\nvarying float outerRadiusPixels;\n\nvoid main(void) {\n  geometry.uv = unitPosition;\n\n  float distToCenter = length(unitPosition) * outerRadiusPixels;\n  float inCircle = smoothedge(distToCenter, outerRadiusPixels);\n\n  if (inCircle == 0.0) {\n    discard;\n  }\n\n  if (stroked > 0.5) {\n    float isLine = smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter);\n    if (filled) {\n      gl_FragColor = mix(vFillColor, vLineColor, isLine);\n    } else {\n      if (isLine == 0.0) {\n        discard;\n      }\n      gl_FragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);\n    }\n  } else if (filled) {\n    gl_FragColor = vFillColor;\n  } else {\n    discard;\n  }\n\n  gl_FragColor.a *= inCircle;\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";