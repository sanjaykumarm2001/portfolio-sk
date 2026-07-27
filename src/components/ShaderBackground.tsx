import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_texCoord;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 centeredUv = (uv - 0.5) * vec2(ratio, 1.0);

  float n1 = snoise(centeredUv * 0.9 + u_time * 0.10);
  float n2 = snoise(centeredUv * 1.5 - u_time * 0.07);
  float n3 = snoise(centeredUv * 0.6 + u_time * 0.04);
  float fluid = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

  // Ultra-Sleek Apple White & Slate Grey Fluid Palette
  vec3 baseColor = vec3(0.98, 0.98, 0.99);       // Pure crisp white
  vec3 lightGrey = vec3(0.90, 0.92, 0.95);       // Soft slate grey
  vec3 midGrey = vec3(0.81, 0.84, 0.88);         // Metallic grey accent
  vec3 pureWhite = vec3(1.0, 1.0, 1.0);          // Specular white highlight

  vec3 color = mix(baseColor, lightGrey, fluid * 0.5 + 0.5);
  float glow1 = smoothstep(0.1, 0.7, fluid);
  float glow2 = smoothstep(-0.6, 0.2, fluid);
  float glow3 = smoothstep(-0.2, 0.8, -fluid);

  color = mix(color, midGrey, glow1 * 0.35);
  color = mix(color, lightGrey, glow2 * 0.25);
  color = mix(color, pureWhite, glow3 * 0.40);

  float spec = pow(max(0.0, fluid), 8.0) * 0.35;
  float rim = pow(1.0 - abs(fluid), 15.0) * 0.12;
  vec3 finalColor = color + vec3(spec + rim);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    let raf = 0;
    const syncSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    window.addEventListener('resize', syncSize);
    syncSize();

    const prog = gl.createProgram();
    if (!prog) return;
    const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    const render = (t: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', syncSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#f7f9fb]">
      {/* Ambient Glass Liquid Animated Orbs - White & Slate Grey */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-slate-200/50 via-slate-100/40 to-transparent blur-3xl animate-pulse duration-[7000ms]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-tl from-slate-300/40 via-white/50 to-transparent blur-3xl animate-pulse duration-[9000ms]" />
      <canvas ref={canvasRef} className="block w-full h-full object-cover relative z-10" />
    </div>
  );
}
