uniform vec3 glowColor;
uniform vec3 sunPosition;
varying float intensity;
varying vec3 v_normal;
void main() 
{
	vec3 glow = glowColor * intensity;
    float backIntensity = dot(v_normal, normalize(sunPosition));
    gl_FragColor = vec4( glow, 0.4 + backIntensity);
    
}
