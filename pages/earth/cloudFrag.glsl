uniform sampler2D globeTexture;
varying vec3 v_normal;
varying vec2 v_uv;
void main() {
    float intensity = 1.05 - dot(v_normal, vec3(0.0,0.0,1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, v_uv).xyz, 1.0);
}