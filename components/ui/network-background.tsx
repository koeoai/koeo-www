"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NetworkBackgroundProps {
  className?: string;
  variant?: "dark" | "light";
  density?: "sparse" | "normal" | "dense";
}

// Node positions scaled to 1920x1080 viewport (will be scaled by viewBox)
const SPARSE_NODES = [
  { x: 192, y: 162 }, { x: 1632, y: 216 }, { x: 960, y: 108 },
  { x: 480, y: 486 }, { x: 1440, y: 540 }, { x: 288, y: 864 },
  { x: 1728, y: 810 }, { x: 864, y: 918 }, { x: 1152, y: 432 },
];

const NORMAL_NODES = [
  { x: 96, y: 108 }, { x: 480, y: 54 }, { x: 960, y: 130 }, { x: 1440, y: 86 }, { x: 1824, y: 162 },
  { x: 192, y: 378 }, { x: 672, y: 324 }, { x: 1152, y: 410 }, { x: 1632, y: 346 },
  { x: 384, y: 594 }, { x: 864, y: 540 }, { x: 1344, y: 626 }, { x: 1766, y: 562 },
  { x: 154, y: 810 }, { x: 576, y: 864 }, { x: 1056, y: 778 }, { x: 1536, y: 842 },
  { x: 288, y: 994 }, { x: 768, y: 1026 }, { x: 1248, y: 950 }, { x: 1728, y: 972 },
];

const DENSE_NODES = [
  { x: 58, y: 86 }, { x: 346, y: 54 }, { x: 634, y: 108 }, { x: 922, y: 65 }, { x: 1210, y: 130 }, { x: 1498, y: 43 }, { x: 1786, y: 97 },
  { x: 154, y: 238 }, { x: 442, y: 194 }, { x: 730, y: 270 }, { x: 1018, y: 216 }, { x: 1306, y: 302 }, { x: 1594, y: 173 }, { x: 1882, y: 259 },
  { x: 96, y: 410 }, { x: 384, y: 378 }, { x: 672, y: 454 }, { x: 960, y: 389 }, { x: 1248, y: 475 }, { x: 1536, y: 346 }, { x: 1824, y: 432 },
  { x: 192, y: 594 }, { x: 480, y: 562 }, { x: 768, y: 626 }, { x: 1056, y: 540 }, { x: 1344, y: 648 }, { x: 1632, y: 518 },
  { x: 58, y: 778 }, { x: 346, y: 734 }, { x: 634, y: 810 }, { x: 922, y: 756 }, { x: 1210, y: 842 }, { x: 1498, y: 702 }, { x: 1786, y: 799 },
  { x: 154, y: 950 }, { x: 442, y: 918 }, { x: 730, y: 994 }, { x: 1018, y: 886 }, { x: 1306, y: 1026 }, { x: 1594, y: 864 }, { x: 1882, y: 972 },
];

// Generate connections between nearby nodes
function generateConnections(
  nodes: { x: number; y: number }[],
  maxDistance: number = 300
) {
  const connections: { from: number; to: number; distance: number }[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        connections.push({ from: i, to: j, distance });
      }
    }
  }

  return connections;
}

export function NetworkBackground({
  className,
  variant = "dark",
  density = "normal",
}: NetworkBackgroundProps) {
  const nodes =
    density === "sparse"
      ? SPARSE_NODES
      : density === "dense"
        ? DENSE_NODES
        : NORMAL_NODES;
  const maxDistance = density === "sparse" ? 500 : density === "dense" ? 350 : 400;
  const connections = React.useMemo(
    () => generateConnections(nodes, maxDistance),
    [nodes, maxDistance]
  );

  const nodeColor =
    variant === "dark" ? "fill-purple-primary/50" : "fill-purple-primary/30";
  const nodeGlow =
    variant === "dark" ? "fill-pink-light/30" : "fill-purple-primary/15";
  const lineColor =
    variant === "dark" ? "stroke-purple-primary/15" : "stroke-purple-primary/10";
  const lineGlow =
    variant === "dark" ? "stroke-pink-light/10" : "stroke-purple-primary/8";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter for nodes - subtle to match hero */}
          <filter
            id="nodeGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        <g className={lineColor}>
          {connections.map((conn, i) => {
            const from = nodes[conn.from];
            const to = nodes[conn.to];
            const opacity = 1 - conn.distance / maxDistance;

            return (
              <line
                key={`line-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                strokeWidth="0.5"
                opacity={opacity * 0.9}
                className="transition-opacity duration-1000"
              />
            );
          })}
        </g>

        {/* Animated pulse lines (subset for performance) */}
        <g className={lineGlow}>
          {connections
            .slice(0, Math.floor(connections.length / 3))
            .map((conn, i) => {
              const from = nodes[conn.from];
              const to = nodes[conn.to];

              return (
                <line
                  key={`pulse-${i}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  strokeWidth="4"
                  opacity="0"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "3s",
                  }}
                />
              );
            })}
        </g>

        {/* Node glow (larger, behind) */}
        <g className={nodeGlow} filter="url(#nodeGlow)">
          {nodes.map((node, i) => (
            <circle
              key={`glow-${i}`}
              cx={node.x}
              cy={node.y}
              r="4"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "4s",
              }}
            />
          ))}
        </g>

        {/* Nodes - tiny to match hero's subtle nodes */}
        <g className={nodeColor}>
          {nodes.map((node, i) => (
            <circle key={`node-${i}`} cx={node.x} cy={node.y} r="1.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}
