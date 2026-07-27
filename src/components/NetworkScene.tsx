import { useEffect, useRef, useState } from 'react';

type NodePos = { x: number; y: number; z: number; id: string };

const NODES: NodePos[] = [
  { x: 0, y: 1.8, z: 0, id: 'cloudflare' },
  { x: 0, y: 0.8, z: 0, id: 'alb' },
  { x: -1.5, y: -0.2, z: 0, id: 'k8s' },
  { x: 1.5, y: -0.2, z: 0, id: 'db' },
  { x: 0, y: -1.2, z: 0, id: 'monitoring' },
];

const CONNECTIONS: [number, number][] = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]];

function project(node: NodePos, rotY: number, rotX: number, scale: number, cx: number, cy: number) {
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const x1 = node.x * cosY - node.z * sinY;
  const z1 = node.x * sinY + node.z * cosY;
  const y1 = node.y * cosX - z1 * sinX;
  const z2 = node.y * sinX + z1 * cosX;
  const persp = 6 / (6 + z2);
  return {
    sx: cx + x1 * scale * persp,
    sy: cy + y1 * scale * persp,
    depth: z2,
  };
}

export default function NetworkScene() {
  const [tick, setTick] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(performance.now());

  useEffect(() => {
    const loop = () => {
      setTick(performance.now() - startRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const rotY = tick * 0.0002;
  const rotX = Math.sin(tick * 0.0005) * 0.1;
  const scale = 110;
  const cx = 50;
  const cy = 50;

  const projected = NODES.map((n, i) => ({
    ...project(n, rotY, rotX, scale, cx, cy),
    pulse: 1 + Math.sin(tick * 0.002 + i) * 0.08,
    bob: Math.sin(tick * 0.001 + i) * 1.2,
  }));

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      {CONNECTIONS.map(([a, b], i) => {
        const p1 = projected[a];
        const p2 = projected[b];
        const avgDepth = (p1.depth + p2.depth) / 2;
        const opacity = Math.max(0.08, 0.28 - avgDepth * 0.04);
        return (
          <line
            key={i}
            x1={p1.sx}
            y1={p1.sy + p1.bob}
            x2={p2.sx}
            y2={p2.sy + p2.bob}
            stroke="#3b82f6"
            strokeWidth={0.3}
            strokeOpacity={opacity}
          />
        );
      })}
      {projected.map((p, i) => {
        const r = 1.4 * p.pulse;
        const glowR = r * 2.8;
        return (
          <g key={NODES[i].id}>
            <circle cx={p.sx} cy={p.sy + p.bob} r={glowR} fill="url(#nodeGlow)" opacity={0.35} filter="url(#blur)" />
            <circle cx={p.sx} cy={p.sy + p.bob} r={r} fill="#2563eb" stroke="#60a5fa" strokeWidth={0.2} />
          </g>
        );
      })}
    </svg>
  );
}
