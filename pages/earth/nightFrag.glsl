uniform sampler2D globeTexture;
uniform vec3 sunPosition;
varying vec3 v_normal;
varying vec2 v_uv;
void main() {
    float isBack = dot(v_normal, normalize(sunPosition));
    if(isBack < 0.0) {
        // if(texture2D(globeTexture, v_uv).x + texture2D(globeTexture, v_uv).y + texture2D(globeTexture, v_uv).z > 0.35) {
        //     gl_FragColor = vec4(vec3(0.99,1.0,0.71), -isBack);
        // }
        gl_FragColor = vec4(texture2D(globeTexture, v_uv).x * vec3(0.99,1.0,0.71), -isBack);
        
    }else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
    
}