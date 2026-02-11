"use client";

import { useState, useEffect, useRef, useMemo, useId } from "react";
import { cn } from "@/lib/utils";

interface NeuralConductorHeroProps {
  className?: string;
  harmony?: number;
}

interface NeuralNode {
  id: number;
  chaosX: number;
  chaosY: number;
  organizedX: number;
  organizedY: number;
  layer: number;
  size: number;
  // Animation parameters for ambient motion
  animDuration: number;
  animDelay: number;
}

interface Connection {
  from: number;
  to: number;
}

// Seeded random for consistent positions (SSR-safe)
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Generate network structure based on dimensions
function generateNetwork(width: number, height: number) {
  const layers = [4, 6, 8, 6, 4];
  const nodes: NeuralNode[] = [];
  const connections: Connection[] = [];

  let nodeId = 0;
  const layerSpacing = width / (layers.length + 1);

  layers.forEach((layerSize, layerIndex) => {
    const x = layerSpacing * (layerIndex + 1);
    const nodeSpacing = height / (layerSize + 1);

    for (let i = 0; i < layerSize; i++) {
      const y = nodeSpacing * (i + 1);
      const seed = nodeId * 137 + layerIndex * 17;

      nodes.push({
        id: nodeId,
        chaosX: seededRandom(seed) * width,
        chaosY: seededRandom(seed + 1) * height,
        organizedX: x,
        organizedY: y,
        layer: layerIndex,
        size: layerIndex === 2 ? 8 : 6,
        // Varied animation timing for organic feel
        animDuration: 4 + seededRandom(seed + 2) * 4, // 4-8s
        animDelay: seededRandom(seed + 3) * -8, // staggered start
      });

      if (layerIndex > 0) {
        const prevLayerStart = nodes.findIndex((n) => n.layer === layerIndex - 1);
        const prevLayerSize = layers[layerIndex - 1];

        for (let j = 0; j < prevLayerSize; j++) {
          if (seededRandom(nodeId * 100 + j) < 0.6) {
            connections.push({ from: prevLayerStart + j, to: nodeId });
          }
        }
      }
      nodeId++;
    }
  });

  return { nodes, connections };
}

export function NeuralConductorHero({
  className,
  harmony: externalHarmony,
}: NeuralConductorHeroProps) {
  const [internalHarmony, setInternalHarmony] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);

  const uniqueId = useId();
  const glowFilterId = `neuralGlow-${uniqueId}`;
  const gradientId = `connectionGradient-${uniqueId}`;

  const harmony = externalHarmony ?? internalHarmony;
  const isControlled = externalHarmony !== undefined;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration: set mounted state after client render
    setMounted(true);
  }, []);

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

  const { nodes, connections } = useMemo(
    () => generateNetwork(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isControlled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.min(dimensions.width, dimensions.height) * 0.45;

    setInternalHarmony(Math.max(0, 1 - dist / maxDist));
  };

  const colors = ["#7C3AED", "#A855F7", "#EC4899", "#A855F7", "#7C3AED"];

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full min-h-[500px] overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isControlled && setInternalHarmony(0)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2D1B4E] via-[50%] to-[#7C3AED]" />

      {mounted && nodes.length > 0 && (
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <filter id={glowFilterId}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* Connections - use CSS transitions instead of JS animation */}
          {connections.map((conn, i) => {
            const fromNode = nodes[conn.from];
            const toNode = nodes[conn.to];
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.chaosX * (1 - harmony) + fromNode.organizedX * harmony;
            const y1 = fromNode.chaosY * (1 - harmony) + fromNode.organizedY * harmony;
            const x2 = toNode.chaosX * (1 - harmony) + toNode.organizedX * harmony;
            const y2 = toNode.chaosY * (1 - harmony) + toNode.organizedY * harmony;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={harmony > 0.5 ? `url(#${gradientId})` : "#4C1D95"}
                strokeWidth={0.5 + harmony * 1.5}
                opacity={0.08 + harmony * 0.6}
                className="transition-all duration-300 ease-out"
              />
            );
          })}

          {/* Signal pulses - CSS animation, only when harmonized */}
          {harmony > 0.4 &&
            connections.slice(0, 12).map((conn, i) => {
              const fromNode = nodes[conn.from];
              const toNode = nodes[conn.to];
              if (!fromNode || !toNode) return null;

              return (
                <circle key={`signal-${i}`} r={3} fill="#F472B6" opacity={harmony * 0.8}>
                  <animateMotion
                    dur={`${1.5 + i * 0.1}s`}
                    repeatCount="indefinite"
                    path={`M ${fromNode.organizedX} ${fromNode.organizedY} L ${toNode.organizedX} ${toNode.organizedY}`}
                  />
                </circle>
              );
            })}

          {/* Nodes - CSS transitions for position changes */}
          {nodes.map((node) => {
            const x = node.chaosX * (1 - harmony) + node.organizedX * harmony;
            const y = node.chaosY * (1 - harmony) + node.organizedY * harmony;
            const color = colors[node.layer];
            const size = node.size * (harmony > 0.5 ? 1.1 : 1);

            return (
              <g 
                key={node.id} 
                className="transition-all duration-300 ease-out"
                style={{
                  // @ts-expect-error CSS custom properties
                  "--anim-duration": `${node.animDuration}s`,
                  "--anim-delay": `${node.animDelay}s`,
                }}
              >
                {/* Outer glow with pulse */}
                <circle
                  cx={x}
                  cy={y}
                  r={size * 3}
                  fill={color}
                  opacity={0.1 + harmony * 0.2}
                  className="transition-all duration-300 ease-out animate-node-pulse"
                />

                {/* Node with drift */}
                <circle
                  cx={x}
                  cy={y}
                  r={size}
                  fill={color}
                  filter={harmony > 0.5 ? `url(#${glowFilterId})` : undefined}
                  className="transition-all duration-300 ease-out animate-node-drift"
                />

                {/* Inner highlight */}
                <circle
                  cx={x}
                  cy={y}
                  r={size * 0.4}
                  fill="white"
                  opacity={0.5 + harmony * 0.4}
                  className="transition-all duration-300 ease-out animate-node-drift"
                />
              </g>
            );
          })}
        </svg>
      )}
      
      {/* CSS animations for ambient node motion - GPU accelerated */}
      <style jsx>{`
        @keyframes node-drift {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(3px, -2px);
          }
          50% {
            transform: translate(-2px, 3px);
          }
          75% {
            transform: translate(2px, 2px);
          }
        }
        
        @keyframes node-pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.15);
          }
        }
        
        .animate-node-drift {
          animation: node-drift var(--anim-duration, 6s) ease-in-out infinite;
          animation-delay: var(--anim-delay, 0s);
          transform-origin: center;
          transform-box: fill-box;
        }
        
        .animate-node-pulse {
          animation: node-pulse var(--anim-duration, 6s) ease-in-out infinite;
          animation-delay: var(--anim-delay, 0s);
          transform-origin: center;
          transform-box: fill-box;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-node-drift,
          .animate-node-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
