import { IShader, ShaderPrecision, UniformsRequired } from "../../shader.types";

export const blackFlower: (precision: ShaderPrecision) => IShader = (precision) => ({
    uniformsRequired: [UniformsRequired.resolution, UniformsRequired.time],
    code: `
    #define P 3.1415926535897932384

    precision ${precision} float;
    uniform float iTime;
    uniform vec3 iResolution;

    float c(vec3 p, float s) { return length(p) - s; }
    float sq(vec3 p, float s, float r) { return length(max(abs(p) - s,0.)) - r; }

    mat2 rot(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c,s,-s,c);
    }

    float anim1(float x, float s) {
    x = mod(x,2.) - 1.5;
    return smoothstep(s,-s,x) - smoothstep(s,-s,x+1.);
    }

    float t;
    float df(vec3 p) {
        float cc = c(p,.65);
        
        p.xz *= rot(t*.05 + .5);
        p.xy *= rot(-.5);
        
        vec3 p2 = p;
        for(int i = 0; i < 8; i++) {
            p2.xy *= rot(P*.211);
            p2 = abs(p2) - .31 + .31*(.5+.5*cos(p2.x*3.));
            p2.xz *= rot(P*(.5+.5*cos(p2.y*8.)));
        }
        float n = 5.;
        float s1 = c(p,.1);
        float s2 = sq(p2,.1,.001);
        float d = mix(s1,s2,anim1(t*.1 + cos(p.y*4.) + 1.2,.15));
        return max(d,cc);
    }

    #define MIN_DIST 1.5
    #define MAX_DIST 8.
    #define MAX_STEPS 200
    #define LIM .0001
    vec3 rm(vec3 c, vec3 r) {
        vec3 color = vec3(.0);
        vec3 p = c + r*MIN_DIST;
        for(int i = 0; i < MAX_STEPS; i++) {
            float d = df(p);
            if(d < LIM) return color + float(i)*.015;
            if(distance(c,p) > MAX_DIST) return color + float(i)*.01;
            p += d*r;
        }
        return color;
    }

    void main() {
        vec2 st = gl_FragCoord.xy/iResolution.xy - .5;
        st.x *= iResolution.x/iResolution.y;
        t = iTime;
        
        vec3 c = vec3(0.,0.,(-2.));
        vec3 r = normalize(vec3(st,1.288));
        
        vec3 color = rm(c,r);
        color = pow(color*2.1,vec3(1.8)) - pow(length(st)*1.5,3.);
        color = clamp(color,.05,1.);
        //color = .05 + smoothstep(.2,.3,color); // bicolour version
        gl_FragColor = vec4(color,1.0);
    }
`
})
