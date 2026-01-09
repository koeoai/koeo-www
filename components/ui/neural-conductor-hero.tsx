"use client";

import { useState, useEffect, useRef } from "react";
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
}

interface Connection {
  from: number;
  to: number;
}

// Seeded random for consistent positions
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export function NeuralConductorHero({ className, harmony: externalHarmony }: NeuralConductorHeroProps) {
  const [internalHarmony, setInternalHarmony] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [nodes, setNodes] = useState<NeuralNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use external harmony if provided, otherwise use internal
  const harmony = externalHarmony ?? internalHarmony;
  const isControlled = externalHarmony !== undefined;

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update dimensions on mount and resize
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

  // Generate network when dimensions change
  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    const layers = [4, 6, 8, 6, 4];
    const newNodes: NeuralNode[] = [];
    const newConnections: Connection[] = [];
    
    let nodeId = 0;
    const layerSpacing = width / (layers.length + 1);

    layers.forEach((layerSize, layerIndex) => {
      const x = layerSpacing * (layerIndex + 1);
      const nodeSpacing = height / (layerSize + 1);

      for (let i = 0; i < layerSize; i++) {
        const y = nodeSpacing * (i + 1);
        const seed = nodeId * 137 + layerIndex * 17;
        
        newNodes.push({
          id: nodeId,
          chaosX: seededRandom(seed) * width,
          chaosY: seededRandom(seed + 1) * height,
          organizedX: x,
          organizedY: y,
          layer: layerIndex,
          size: layerIndex === 2 ? 8 : 6,
        });

        if (layerIndex > 0) {
          const prevLayerStart = newNodes.findIndex(n => n.layer === layerIndex - 1);
          const prevLayerSize = layers[layerIndex - 1];
          
          for (let j = 0; j < prevLayerSize; j++) {
            if (seededRandom(nodeId * 100 + j) < 0.6) {
              newConnections.push({ from: prevLayerStart + j, to: nodeId });
            }
          }
        }
        nodeId++;
      }
    });

    setNodes(newNodes);
    setConnections(newConnections);
  }, [dimensions]);

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
      
      {/* Only render SVG content after mount to avoid hydration mismatch */}
      {mounted && nodes.length > 0 && (
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="neuralGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* Connections */}
          {connections.map((conn, i) => {
            const fromNode = nodes[conn.from];
            const toNode = nodes[conn.to];
            if (!fromNode || !toNode) return null;

            // Use exact organized positions when harmony is 1
            const x1 = harmony >= 1 ? fromNode.organizedX : fromNode.chaosX * (1 - harmony) + fromNode.organizedX * harmony;
            const y1 = harmony >= 1 ? fromNode.organizedY : fromNode.chaosY * (1 - harmony) + fromNode.organizedY * harmony;
            const x2 = harmony >= 1 ? toNode.organizedX : toNode.chaosX * (1 - harmony) + toNode.organizedX * harmony;
            const y2 = harmony >= 1 ? toNode.organizedY : toNode.chaosY * (1 - harmony) + toNode.organizedY * harmony;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={harmony > 0.5 ? "url(#connectionGradient)" : "#4C1D95"}
                strokeWidth={1 + harmony}
                opacity={0.2 + harmony * 0.5}
                className="transition-all duration-500 ease-out"
              />
            );
          })}

          {/* Signal pulses - only when harmonized */}
          {harmony > 0.4 && connections.slice(0, 15).map((conn, i) => {
            const fromNode = nodes[conn.from];
            const toNode = nodes[conn.to];
            if (!fromNode || !toNode) return null;

            return (
              <circle
                key={`signal-${i}`}
                r={3}
                fill="#F472B6"
                opacity={harmony * 0.8}
              >
                <animateMotion
                  dur={`${1.5 + i * 0.1}s`}
                  repeatCount="indefinite"
                  path={`M ${fromNode.organizedX} ${fromNode.organizedY} L ${toNode.organizedX} ${toNode.organizedY}`}
                />
              </circle>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            // Use exact organized positions when harmony is 1
            const x = harmony >= 1 ? node.organizedX : node.chaosX * (1 - harmony) + node.organizedX * harmony;
            const y = harmony >= 1 ? node.organizedY : node.chaosY * (1 - harmony) + node.organizedY * harmony;
            const color = colors[node.layer];
            const size = node.size * (harmony > 0.5 ? 1.1 : 1);

            return (
              <g 
                key={node.id}
                className="transition-all duration-500 ease-out"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {/* Outer glow */}
                <circle
                  cx={0}
                  cy={0}
                  r={size * 3}
                  fill={color}
                  opacity={0.1 + harmony * 0.2}
                />
                
                {/* Node */}
                <circle
                  cx={0}
                  cy={0}
                  r={size}
                  fill={color}
                  filter={harmony > 0.5 ? "url(#neuralGlow)" : undefined}
                />
                
                {/* Inner highlight */}
                <circle
                  cx={0}
                  cy={0}
                  r={size * 0.4}
                  fill="white"
                  opacity={0.5 + harmony * 0.4}
                />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
