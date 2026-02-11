"use client";

import { useEffect, useState, useMemo, useRef, useId } from "react";
import { cn } from "@/lib/utils";

interface NetworkBackgroundSVGProps {
  className?: string;
  variant?: "dark" | "light";
  density?: "sparse" | "normal" | "dense";
}

interface Node {
  id: number;
  x: number;
  y: number;
  radius: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
}

interface Connection {
  from: number;
  to: number;
}

// Match canvas constants exactly
const NODE_DENSITY = 6000;
const MIN_NODES = 40;
const MAX_NODES = 400;
const CONNECTION_DISTANCE = 120; // pixels
const DENSITY_MULTIPLIERS = { sparse: 0.5, normal: 1, dense: 1.5 };

// Seeded random for consistent SSR/client rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateNetwork(
  width: number,
  height: number,
  density: "sparse" | "normal" | "dense",
  seed: number = 42
): { nodes: Node[]; connections: Connection[]; lightPaths: number[][] } {
  // Calculate node count same as canvas
  const area = width * height;
  const count = Math.max(
    MIN_NODES,
    Math.min(MAX_NODES, Math.floor((area / NODE_DENSITY) * DENSITY_MULTIPLIERS[density]))
  );

  // Generate nodes with pixel positions
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    const randX = seededRandom(seed + i * 3);
    const randY = seededRandom(seed + i * 3 + 1);
    const randR = seededRandom(seed + i * 3 + 2);
    
    // Match canvas node radius: (Math.random() * 2 + 2.5) * 0.85 = ~2.1 to 3.8px
    const radius = (randR * 2 + 2.5) * 0.85;
    
    nodes.push({
      id: i,
      x: randX * width,
      y: randY * height,
      radius,
      duration: 8 + (i % 5) * 2,
      delay: (i * 0.2) % 6,
      dx: (seededRandom(seed + i * 7) - 0.5) * 15,
      dy: (seededRandom(seed + i * 7 + 1) - 0.5) * 15,
    });
  }

  // Generate connections using same distance threshold as canvas (120px)
  const connections: Connection[] = [];
  const connectionDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distSq = dx * dx + dy * dy;
      if (distSq < connectionDistSq) {
        connections.push({ from: i, to: j });
      }
    }
  }

  // Generate traveling light paths
  const lightPaths: number[][] = [];
  const usedStarts = new Set<number>();
  
  for (let p = 0; p < 8; p++) {
    let startNode = -1;
    for (let attempt = 0; attempt < 20; attempt++) {
      const candidateConn = connections[Math.floor(seededRandom(seed + p * 100 + attempt) * connections.length)];
      if (candidateConn && !usedStarts.has(candidateConn.from)) {
        startNode = candidateConn.from;
        usedStarts.add(startNode);
        break;
      }
    }
    if (startNode === -1) continue;

    const path = [startNode];
    const visited = new Set([startNode]);
    let current = startNode;

    for (let step = 0; step < 8; step++) {
      const neighbors = connections
        .filter(c => (c.from === current || c.to === current))
        .map(c => c.from === current ? c.to : c.from)
        .filter(n => !visited.has(n));
      
      if (neighbors.length === 0) break;
      const next = neighbors[Math.floor(seededRandom(seed + p * 50 + step) * neighbors.length)];
      path.push(next);
      visited.add(next);
      current = next;
    }

    if (path.length >= 3) {
      lightPaths.push(path);
    }
  }

  return { nodes, connections, lightPaths };
}

export function NetworkBackgroundSVG({
  className,
  variant = "dark",
  density = "normal",
}: NetworkBackgroundSVGProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  
  // Generate unique IDs for SVG filters/gradients to avoid conflicts
  const uniqueId = useId();
  const nodeGlowId = `node-glow-${uniqueId}`;
  const lightGlowId = `light-glow-${uniqueId}`;

  // Only measure on client to avoid hydration mismatch
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const network = useMemo(() => {
    if (!dimensions) return null;
    return generateNetwork(dimensions.width, dimensions.height, density);
  }, [dimensions, density]);

  const isLight = variant === "light";
  const nodeOpacity = isLight ? 0.4 : 0.6;
  const lineOpacity = isLight ? 0.12 : 0.15;

  // Build SVG path for a light trail
  const buildLightPath = (nodeIndices: number[]) => {
    if (!network || nodeIndices.length < 2) return "";
    return nodeIndices
      .map((idx, i) => `${i === 0 ? "M" : "L"} ${network.nodes[idx].x} ${network.nodes[idx].y}`)
      .join(" ");
  };

  // Don't render until we have dimensions (avoids hydration mismatch)
  if (!dimensions || !network) {
    return (
      <div 
        ref={containerRef} 
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} 
      />
    );
  }

  const { nodes, connections, lightPaths } = network;

  return (
    <div 
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <defs>
          <filter id={nodeGlowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <radialGradient id={lightGlowId}>
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E02F87" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        <g stroke="#7C3AED" strokeWidth="0.75" opacity={lineOpacity}>
          {connections.map((conn, i) => (
            <line
              key={i}
              x1={nodes[conn.from].x}
              y1={nodes[conn.from].y}
              x2={nodes[conn.to].x}
              y2={nodes[conn.to].y}
            />
          ))}
        </g>

        {/* Nodes */}
        <g fill="#7C3AED" opacity={nodeOpacity}>
          {nodes.map((node) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.radius}
              filter={`url(#${nodeGlowId})`}
              className="animate-node-float"
              style={{
                // @ts-expect-error CSS custom properties
                "--float-x": `${node.dx}px`,
                "--float-y": `${node.dy}px`,
                "--duration": `${node.duration}s`,
                animationDelay: `${node.delay}s`,
              }}
            />
          ))}
        </g>

        {/* Traveling lights */}
        {lightPaths.map((path, i) => {
          const d = buildLightPath(path);
          if (!d) return null;
          const duration = 6 + (i % 3) * 2;
          const delay = i * 1.5;

          return (
            <g key={i}>
              {/* Glow circle following path */}
              <circle
                r="12"
                fill={`url(#${lightGlowId})`}
                className="animate-light-travel"
                style={{
                  // @ts-expect-error CSS custom properties
                  "--duration": `${duration}s`,
                  offsetPath: `path('${d}')`,
                  animationDelay: `${delay}s`,
                }}
              />
              {/* Core white dot */}
              <circle
                r="2"
                fill="white"
                opacity="0.9"
                className="animate-light-travel"
                style={{
                  // @ts-expect-error CSS custom properties
                  "--duration": `${duration}s`,
                  offsetPath: `path('${d}')`,
                  animationDelay: `${delay}s`,
                }}
              />
            </g>
          );
        })}
      </svg>

      <style jsx>{`
        @keyframes node-float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(var(--float-x), var(--float-y));
          }
        }

        @keyframes light-travel {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }

        .animate-node-float {
          animation: node-float var(--duration, 10s) ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .animate-light-travel {
          animation: light-travel var(--duration, 8s) ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-node-float,
          .animate-light-travel {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
