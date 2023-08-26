import { IShader, ShaderPrecision, UniformsRequired } from '../../shader.model';

export const chromaticAberration: (precision: ShaderPrecision) => IShader = (
    precision
) => ({
    uniformsRequired: [
        UniformsRequired.resolution,
        UniformsRequired.time,
        UniformsRequired.texture
    ],
    code: `
    precision ${precision} float;
    uniform float iTime;
    uniform vec3 iResolution;
    uniform sampler2D iChannel0;
    
    void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;

        float amount = 0.0;
        
        // Apply the same offset to both x and y directions, with different random offsets
        float xOffset = sin(iTime * 6.0) + sin(iTime * 19.0) * 0.5;
        float yOffset = sin(iTime * 9.0) + sin(iTime * 27.0) * 0.5;
        
        amount = (1.0 + xOffset) * 0.5;
        amount *= 1.0 + yOffset * 0.5;
        amount *= 1.0 + xOffset * 0.5;
        amount *= yOffset * 0.5;

        // Add additional randomness to the amount calculation
        float randomOffset = fract(sin(iTime) * 43758.5453);
        amount += randomOffset * 0.2; // Adjust the factor to control randomness

        amount *= 0.035;
        
        vec3 col;
        col.r = texture2D( iChannel0, vec2(uv.x+amount,uv.y) ).r;
        col.g = texture2D( iChannel0, uv ).g;
        col.b = texture2D( iChannel0, vec2(uv.x-amount,uv.y) ).b;

        col *= (1.0 - amount * 0.5);
        
        // Get the alpha value from the texture
        float alpha = texture2D(iChannel0, vec2(uv.x-amount * 0.75,uv.y)).a;

        // Blend the texture color with the background color based on alpha
        vec3 backgroundColor = vec3(0.0, 0.0, 0.0); // Set your background color here
        col = mix(backgroundColor, col, alpha);

        gl_FragColor = vec4(col, alpha); // Set the output color with adjusted alpha
    }
`
});
