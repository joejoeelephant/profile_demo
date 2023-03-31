uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
varying vec3 v_normal;
void main() 
{
    v_normal = normalize(normal);
    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * viewVector );
	intensity = pow( c - dot(vNormal, vNormel), p );
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
