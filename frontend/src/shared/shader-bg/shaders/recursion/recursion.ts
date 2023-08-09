import { IShader, UniformsRequired } from "../../shader.types";

export const recursion: IShader = {
    uniformsRequired: [UniformsRequired.resolution, UniformsRequired.time],
    code: `// CC0: Recursion for Windows Terminal
    //  Tweaked an earlier shader for user with Windows Terminal
    //  https://github.com/mrange/windows-terminal-shader-gallery
    
    precision highp float; 
    uniform float iTime;
    uniform vec3 iResolution;
    
    #define TIME            iTime
    #define RESOLUTION      iResolution
    
    #define PI              3.141592654
    #define TAU             (2.0*PI)
    #define PI_2            (0.5*PI)
    #define ROT(a)          mat2(cos(a), sin(a), -sin(a), cos(a))
    
    // License: WTFPL, author: sam hocevar, found: https://stackoverflow.com/a/17897228/418488
    const vec4 hsv2rgb_K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 hsv2rgb(vec3 c) {
      vec3 p = abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www);
      return c.z * mix(hsv2rgb_K.xxx, clamp(p - hsv2rgb_K.xxx, 0.0, 1.0), c.y);
    }
    // License: WTFPL, author: sam hocevar, found: https://stackoverflow.com/a/17897228/418488
    //  Macro version of above to enable compile-time constants
    #define HSV2RGB(c)  (c.z * mix(hsv2rgb_K.xxx, clamp(abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www) - hsv2rgb_K.xxx, 0.0, 1.0), c.y))
    
    const float hoff      = 0.0;
    const vec3 skyCol     = HSV2RGB(vec3(hoff+0.57, 0.70, 0.25));
    const vec3 glowCol    = HSV2RGB(vec3(hoff+0.025, 0.85, 0.5));
    const vec3 diffCol    = HSV2RGB(vec3(hoff+0.75, 0.85, 1.0));
    const vec3 sunCol1    = HSV2RGB(vec3(hoff+0.60, 0.50, 0.5));
    const vec3 sunCol2    = HSV2RGB(vec3(hoff+0.05, 0.75, 25.0));
    const vec3 sunDir1    = normalize(vec3(3., 3.0, -7.0));
    
    // License: Unknown, author: nmz (twitter: @stormoid), found: https://www.shadertoy.com/view/NdfyRM
    vec3 sRGB(vec3 t) {
      return mix(1.055*pow(t, vec3(1./2.4)) - 0.055, 12.92*t, step(t, vec3(0.0031308)));
    }
    
    // License: Unknown, author: Matt Taylor (https://github.com/64), found: https://64.github.io/tonemapping/
    vec3 aces_approx(vec3 v) {
      const float multiplier = 0.6;
      v = max(v, 0.0);
      v *= multiplier;
      float a = 2.51;
      float b = 0.03;
      float c = 2.43;
      float d = 0.59;
      float e = 0.14;
        const float min = 0.0;
        const float max = 1.0;
      return clamp((v*(a*v+b))/(v*(c*v+d)+e), min, max);
    }
    
    // License: MIT, author: Inigo Quilez, found: https://iquilezles.org/articles/distfunctions/
    float rayPlane(vec3 ro, vec3 rd, vec4 p) {
      return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);
    }
    
    // License: MIT, author: Inigo Quilez, found: https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
    float box(vec2 p, vec2 b) {
      vec2 d = abs(p)-b;
      return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
    }
    
    // License: MIT, author: Inigo Quilez, found: https://iquilezles.org/articles/intersectors/
    vec2 raySphere(vec3 ro, vec3 rd, vec4 sph) {
      vec3 ce = sph.xyz;
      float ra= sph.w;
      vec3 oc = ro - ce;
      float b = dot( oc, rd );
      float c = dot( oc, oc ) - ra*ra;
      float h = b*b - c;
      if( h<0.0 ) return vec2(-1.0); // no intersection
      h = sqrt( h );
      return vec2( -b-h, -b+h );
    }
    
    // License: MIT, author: Pascal Gilcher, found: https://www.shadertoy.com/view/flSXRV
    float atan_approx(float y, float x) {
      float cosatan2 = x / (abs(x) + abs(y));
      float t = PI_2 - cosatan2 * PI_2;
      return y < 0.0 ? -t : t;
    }
    
    // License: Unknown, author: Claude Brezinski, found: https://mathr.co.uk/blog/2017-09-06_approximating_hyperbolic_tangent.html
    float tanh_approx(float x) {
      //  Found this somewhere on the interwebs
      //  return tanh(x);
      float x2 = x*x;
      return clamp(x*(27.0 + x2)/(27.0+9.0*x2), -1.0, 1.0);
    }
    
    // License: Unknown, author: Unknown, found: don't remember
    float hash(float co) {
      return fract(sin(co*12.9898) * 13758.5453);
    }
    
    
    vec3 render0(vec3 ro, vec3 rd) {
      vec3 col = vec3(0.0);
      float sd = max(dot(sunDir1, rd), 0.0);
      float sf = 1.0001-sd;
      col += clamp(vec3(0.0025/abs(rd.y))*glowCol, 0.0, 1.0);
      col += 0.75*skyCol*pow((1.0-abs(rd.y)), 8.0);
      col += 2.0*sunCol1*pow(sd, 100.0);
      col += sunCol2*pow(sd, 800.0);
    
      float tp1  = rayPlane(ro, rd, vec4(vec3(0.0, -1.0, 0.0), 6.0));
    
      if (tp1 > 0.0) {
        vec3 pos  = ro + tp1*rd;
        vec2 pp = pos.xz;
        float db = box(pp, vec2(5.0, 9.0))-3.0;
        
        col += vec3(4.0)*skyCol*rd.y*rd.y*smoothstep(0.25, 0.0, db);
        col += vec3(0.8)*skyCol*exp(-0.5*max(db, 0.0));
        col += 0.25*sqrt(skyCol)*max(-db, 0.0);
      }
    
      return clamp(col, 0.0, 10.0);;
    }
    
    float split(vec3 sp, vec4 sph, float h) {
      const float aa = 0.04;
      float angle = atan_approx(sp.x, sp.z)+h*TAU;
      float d = sph.w*(0.5*sin(4.0*angle)+0.15)/2.5-sp.y;
      return smoothstep(-aa, aa, d);
    }
    
    vec3 render1(vec3 ro, vec3 rd) {
      vec3 ld = normalize(vec3(0.0) - ro);
    
      vec3 bcol = vec3(0.0);
      vec3 fcol = vec3(0.0);
      
      float ftm = TIME*TAU*10.0;
      const float foff = 0.3;
      const vec3 beerf = -0.125*vec3(1.0, 2.0, 3.0);
      float tm = TIME*0.05;
      float ff = fract(tm);
      float ofo = smoothstep(0.9, 0.0, ff);
      float flare = smoothstep(0.0, 1.0, cos(TAU*ff));
    
      vec3 light = (mix(vec3(.001), 0.5*vec3(0.015, 0.01, 0.025), flare))/(0.0001+ 1.0-max(dot(ld, rd), 0.0));
    
      const float MaxIter = 12.0;
      for (float i = 0.0; i <  MaxIter; ++i) {
        float j = i+floor(tm);
        float h = hash(j+123.4);
        vec4 sph = vec4(vec3(0.0) , 4.5*exp2(-(i-ff)*0.5));
    
        vec2 s2 = raySphere(ro, rd, sph);
    
        float sd = s2.y - s2.x;
        if (sd == 0.0) {
          break;
        }
        
        float fo = i == 0.0 ? ofo : 1.0;
        
        vec3 beer0 = exp(beerf*(s2.x));
        vec3 p0 = ro+rd*s2.x;
        vec3 sp0 = p0 - sph.xyz;
        vec3 n0 = normalize(sp0);
        vec3 r0 = reflect(rd, n0);
        float fre0 = 1.0+dot(rd, n0);
        fre0 *= fre0;
        float dif0 = mix(0.25, 1.0, max(dot(sunDir1, n0), 0.0)); 
        float s0 = split(sp0, sph, h);
        vec3 rcol0 = mix(0.1, 1.0, fre0)*render0(p0, r0);
        vec3 dcol0 = sunCol1*dif0*dif0*diffCol;
        rcol0 += 0.125*dcol0;
        dcol0 += 0.125*rcol0;
        rcol0 *= beer0;
        dcol0 *= beer0;
        rcol0 *= fo;
    
        if (s0 > 0.9) {
          bcol = mix(bcol, mix(bcol, dcol0, tanh_approx(0.18*s2.x)), s0*fo);
          break;
        }
        
        fcol += rcol0*(1.0-s0);
    
        vec3 beer1 = exp(beerf*(s2.y));
        vec3 p1 = ro+rd*s2.y;
        vec3 sp1 = p1 - sph.xyz;
        vec3 n1 = -normalize(sp1);
        float dif1 = mix(0.25, 1.0, max(dot(sunDir1, n1), 0.0)); 
        float s1 = split(sp1, sph, h);
        vec3 dcol1 = sunCol1*dif1*dif1*diffCol;
        dcol1 *= beer1;
        s1 *= fo;
        bcol = mix(bcol, dcol1, s1);
        bcol += light*beer1*fo;
      }
    
    
      vec3 col = bcol;
      col += fcol;
      return col;
    }
    
    vec3 effect(vec2 p, vec2 pp) {
      float tm  = TIME*0.5;
      
      vec3 ro = vec3(5.0, 3.0, 0.);
      ro.xz *= ROT(-0.05*tm+3.0);
      const vec3 la = vec3(0.0, 0.5, 0.0);
      const vec3 up = normalize(vec3(0.0, 1.0, 0.0));
    
      vec3 ww = normalize(la - ro);
      vec3 uu = normalize(cross(up, ww ));
      vec3 vv = (cross(ww,uu));
      const float fov = tan(TAU/6.);
      vec3 rd = normalize(-p.x*uu + p.y*vv + fov*ww);
    
      vec3 col = render1(ro, rd);
      float ll = length(pp);
      col *= smoothstep(1.5, 0.5, ll);
      col -= 0.033*vec3(3.0, 2.0, 1.0)*(ll+0.25);
      col = aces_approx(col); 
      col = sRGB(col);
      
      return col;
    }
    
    void main() {
      vec2 q = gl_FragCoord.xy/RESOLUTION.xy;
      vec2 p = -1. + 2. * q;
      vec2 pp = p;
      p.x *= RESOLUTION.x/RESOLUTION.y;
      vec3 col = vec3(0.0);
      col = effect(p, pp);
      gl_FragColor = vec4(col, 1.0);
    }
    `
}
