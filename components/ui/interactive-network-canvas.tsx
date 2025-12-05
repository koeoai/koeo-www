"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// Types
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  energy: number;
  isLost?: boolean;
}

type CanvasMode = "interactive" | "traveling-lights" | "lost-node";

interface InteractiveNetworkCanvasProps {
  className?: string;
  mode?: CanvasMode;
  density?: "sparse" | "normal" | "dense";
  showBackground?: boolean;
  children?: React.ReactNode;
}

// Constants
const NODE_DENSITY = 6000;
const MIN_NODES = 40;
const MAX_NODES = 400;
const CONNECTION_DISTANCE = 120;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const HOVER_RADIUS = 200;
const HOVER_RADIUS_SQ = HOVER_RADIUS * HOVER_RADIUS;
const BASE_CONNECTION_ALPHA = 0.15;
const TRAVELING_LIGHT_COUNT = 8;
const GLOW_SIZE = 60;

const DENSITY_MULTIPLIERS = { sparse: 0.5, normal: 1, dense: 1.5 };

// Helpers
function calculateNodeCount(width: number, height: number, density: "sparse" | "normal" | "dense"): number {
  const area = width * height;
  const count = Math.floor((area / NODE_DENSITY) * DENSITY_MULTIPLIERS[density]);
  return Math.max(MIN_NODES, Math.min(MAX_NODES, count));
}


export function InteractiveNetworkCanvas({
  className,
  mode = "interactive",
  density = "normal",
  showBackground = true,
  children,
}: InteractiveNetworkCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const lostNodeRef = useRef<Node | null>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isVisibleRef = useRef(true);
  const timeRef = useRef(0);
  
  // For traveling lights mode
  const lightsRef = useRef<{ fromNode: number; toNode: number; progress: number; speed: number }[]>([]);
  const connectionsRef = useRef<{ from: number; to: number }[]>([]);

  const initNodes = useCallback((width: number, height: number): Node[] => {
    const nodeCount = calculateNodeCount(width, height, density);
    const nodes: Node[] = [];

    // For lost-node mode, add the "lost" node first
    if (mode === "lost-node") {
      const lostNode: Node = {
        x: width * 0.3 + Math.random() * width * 0.4,
        y: height * 0.3 + Math.random() * height * 0.4,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 8,
        energy: 0,
        isLost: true,
      };
      nodes.push(lostNode);
      lostNodeRef.current = lostNode;
    }

    const startIndex = mode === "lost-node" ? 1 : 0;
    const count = mode === "lost-node" ? 60 : nodeCount;

    for (let i = startIndex; i < count; i++) {
      const speed = mode === "traveling-lights" 
        ? 0.1 + Math.random() * 0.2 
        : 0.2 + Math.random() * 0.4;
      const angle = Math.random() * Math.PI * 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: mode === "traveling-lights" 
          ? 1.5 + Math.random() * 1 
          : (Math.random() * 2 + 2.5) * 0.85,
        energy: 0,
      });
    }
    return nodes;
  }, [mode, density]);

  const buildConnections = useCallback((nodes: Node[]) => {
    const connections: { from: number; to: number }[] = [];
    const startIdx = mode === "lost-node" ? 1 : 0;
    for (let i = startIdx; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < CONNECTION_DISTANCE_SQ) {
          connections.push({ from: i, to: j });
        }
      }
    }
    return connections;
  }, [mode]);

  const initTravelingLights = useCallback((connections: { from: number; to: number }[]) => {
    if (connections.length === 0) return [];
    const lights = [];
    for (let i = 0; i < TRAVELING_LIGHT_COUNT; i++) {
      const connIndex = Math.floor(Math.random() * connections.length);
      lights.push({
        fromNode: connections[connIndex].from,
        toNode: connections[connIndex].to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      });
    }
    return lights;
  }, []);


  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: !showBackground });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let bgGradient: CanvasGradient;

    // Pre-render glow sprite for interactive mode
    const glowCanvas = document.createElement("canvas");
    const glowCtx = glowCanvas.getContext("2d")!;
    glowCanvas.width = GLOW_SIZE;
    glowCanvas.height = GLOW_SIZE;
    const glowGradient = glowCtx.createRadialGradient(
      GLOW_SIZE / 2, GLOW_SIZE / 2, 0,
      GLOW_SIZE / 2, GLOW_SIZE / 2, GLOW_SIZE / 2
    );
    glowGradient.addColorStop(0, "rgba(244, 114, 182, 0.6)");
    glowGradient.addColorStop(0.4, "rgba(224, 47, 135, 0.3)");
    glowGradient.addColorStop(1, "rgba(124, 58, 237, 0)");
    glowCtx.fillStyle = glowGradient;
    glowCtx.fillRect(0, 0, GLOW_SIZE, GLOW_SIZE);

    const observer = new IntersectionObserver(
      (entries) => { isVisibleRef.current = entries[0]?.isIntersecting ?? true; },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (showBackground) {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, "#2D1B4E");
        bgGradient.addColorStop(0.4, "#4C1D95");
        bgGradient.addColorStop(0.7, "#5B21B6");
        bgGradient.addColorStop(1, "#7C3AED");
      }

      const targetCount = calculateNodeCount(width, height, density);
      const currentCount = nodesRef.current.length;
      if (currentCount === 0 || Math.abs(targetCount - currentCount) > 20) {
        nodesRef.current = initNodes(width, height);
        if (mode === "traveling-lights") {
          connectionsRef.current = buildConnections(nodesRef.current);
          lightsRef.current = initTravelingLights(connectionsRef.current);
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking for interactive mode
    const onMouseMove = (e: MouseEvent) => {
      if (mode !== "interactive") return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    if (mode === "interactive") {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      container.addEventListener("mouseleave", onMouseLeave);
    }

    // Spatial grid for efficient neighbor lookup
    const gridSize = CONNECTION_DISTANCE;
    const grid = new Map<string, number[]>();

    const buildGrid = (nodes: Node[]) => {
      grid.clear();
      const startIdx = mode === "lost-node" ? 1 : 0;
      for (let i = startIdx; i < nodes.length; i++) {
        const key = `${Math.floor(nodes[i].x / gridSize)},${Math.floor(nodes[i].y / gridSize)}`;
        const cell = grid.get(key);
        if (cell) cell.push(i);
        else grid.set(key, [i]);
      }
    };

    const getNeighbors = (x: number, y: number): number[] => {
      const cx = Math.floor(x / gridSize);
      const cy = Math.floor(y / gridSize);
      const result: number[] = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const cell = grid.get(`${cx + dx},${cy + dy}`);
          if (cell) result.push(...cell);
        }
      }
      return result;
    };


    const draw = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      timeRef.current += 0.016;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const lostNode = lostNodeRef.current;

      // Background
      if (showBackground) {
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // Update node positions
      const startIdx = mode === "lost-node" ? 0 : 0;
      for (let i = startIdx; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      // Mode-specific logic
      if (mode === "lost-node" && lostNode) {
        // Make lost node wander erratically
        lostNode.vx += (Math.random() - 0.5) * 0.05;
        lostNode.vy += (Math.random() - 0.5) * 0.05;
        lostNode.vx = Math.max(-1.5, Math.min(1.5, lostNode.vx));
        lostNode.vy = Math.max(-1.5, Math.min(1.5, lostNode.vy));
      }

      if (mode === "interactive") {
        // Update energy based on mouse proximity
        for (const node of nodes) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < HOVER_RADIUS_SQ) {
            node.energy = Math.max(node.energy, 1 - Math.sqrt(distSq) / HOVER_RADIUS);
          } else {
            node.energy *= 0.88;
          }
          if (node.energy < 0.02) node.energy = 0;
        }

        buildGrid(nodes);

        // Propagate energy
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.energy > 0.15) {
            const neighbors = getNeighbors(node.x, node.y);
            for (const j of neighbors) {
              if (i === j) continue;
              const other = nodes[j];
              const dx = node.x - other.x;
              const dy = node.y - other.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < CONNECTION_DISTANCE_SQ) {
                const factor = 1 - Math.sqrt(distSq) / CONNECTION_DISTANCE;
                other.energy = Math.max(other.energy, node.energy * factor * 0.4);
              }
            }
          }
        }
      }

      if (mode === "traveling-lights") {
        // Rebuild connections periodically
        if (Math.random() < 0.02) {
          connectionsRef.current = buildConnections(nodes);
        }
      }


      // Draw connections
      if (mode === "interactive") {
        buildGrid(nodes);
        
        // Base connections
        ctx.beginPath();
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const neighbors = getNeighbors(node.x, node.y);
          for (const j of neighbors) {
            if (j <= i) continue;
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONNECTION_DISTANCE_SQ && Math.max(node.energy, other.energy) <= 0.05) {
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
            }
          }
        }
        ctx.strokeStyle = `rgba(124, 58, 237, ${BASE_CONNECTION_ALPHA})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Energized connections
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const neighbors = getNeighbors(node.x, node.y);
          for (const j of neighbors) {
            if (j <= i) continue;
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distSq = dx * dx + dy * dy;
            const maxEnergy = Math.max(node.energy, other.energy);
            if (distSq < CONNECTION_DISTANCE_SQ && maxEnergy > 0.05) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              const alpha = 0.4 + maxEnergy * 0.6;
              ctx.strokeStyle = `rgba(244, 114, 182, ${alpha})`;
              ctx.lineWidth = 1 + maxEnergy * 2.5;
              ctx.stroke();
            }
          }
        }
      } else if (mode === "traveling-lights") {
        const connections = connectionsRef.current;
        const lights = lightsRef.current;

        // Draw base connections
        ctx.beginPath();
        for (const conn of connections) {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
        }
        ctx.strokeStyle = `rgba(124, 58, 237, 0.12)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Update and draw traveling lights
        for (const light of lights) {
          light.progress += light.speed;
          if (light.progress >= 1 && connections.length > 0) {
            const connIndex = Math.floor(Math.random() * connections.length);
            light.fromNode = connections[connIndex].from;
            light.toNode = connections[connIndex].to;
            light.progress = 0;
            light.speed = 0.003 + Math.random() * 0.004;
          }

          const from = nodes[light.fromNode];
          const to = nodes[light.toNode];
          if (!from || !to) continue;

          const x = from.x + (to.x - from.x) * light.progress;
          const y = from.y + (to.y - from.y) * light.progress;

          // Glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
          gradient.addColorStop(0, "rgba(244, 114, 182, 0.8)");
          gradient.addColorStop(0.5, "rgba(244, 114, 182, 0.3)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fill();

          // Trail
          const trailStart = Math.max(0, light.progress - 0.15);
          const trailX = from.x + (to.x - from.x) * trailStart;
          const trailY = from.y + (to.y - from.y) * trailStart;
          const lineGradient = ctx.createLinearGradient(trailX, trailY, x, y);
          lineGradient.addColorStop(0, "rgba(244, 114, 182, 0)");
          lineGradient.addColorStop(1, "rgba(244, 114, 182, 0.6)");
          ctx.beginPath();
          ctx.moveTo(trailX, trailY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      } else if (mode === "lost-node") {
        // Regular connections (excluding lost node)
        ctx.beginPath();
        for (let i = 1; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONNECTION_DISTANCE_SQ) {
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
            }
          }
        }
        ctx.strokeStyle = "rgba(124, 58, 237, 0.2)";
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Broken connections from lost node
        if (lostNode) {
          ctx.setLineDash([4, 8]);
          for (let i = 1; i < nodes.length; i++) {
            const dx = lostNode.x - nodes[i].x;
            const dy = lostNode.y - nodes[i].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONNECTION_DISTANCE_SQ * 1.5) {
              const dist = Math.sqrt(distSq);
              const alpha = Math.max(0, 0.3 - dist / (CONNECTION_DISTANCE * 1.5));
              ctx.beginPath();
              ctx.moveTo(lostNode.x, lostNode.y);
              ctx.lineTo(nodes[i].x, nodes[i].y);
              ctx.strokeStyle = `rgba(244, 114, 182, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
          ctx.setLineDash([]);
        }
      }


      // Draw nodes
      if (mode === "interactive") {
        // Draw glow sprites for energized nodes
        for (const node of nodes) {
          if (node.energy > 0.1) {
            const size = GLOW_SIZE * (0.5 + node.energy);
            ctx.globalAlpha = node.energy;
            ctx.drawImage(glowCanvas, node.x - size / 2, node.y - size / 2, size, size);
          }
        }
        ctx.globalAlpha = 1;

        // Non-energized nodes
        ctx.beginPath();
        for (const node of nodes) {
          if (node.energy <= 0.1) {
            ctx.moveTo(node.x + node.radius, node.y);
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          }
        }
        ctx.fillStyle = "rgba(124, 58, 237, 0.6)";
        ctx.fill();

        // Energized nodes
        for (const node of nodes) {
          if (node.energy > 0.1) {
            const size = node.radius + node.energy * 4;
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 114, 182, ${0.8 + node.energy * 0.2})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(node.x, node.y, size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + node.energy * 0.4})`;
            ctx.fill();
          }
        }
      } else if (mode === "traveling-lights") {
        ctx.beginPath();
        for (const node of nodes) {
          ctx.moveTo(node.x + node.radius, node.y);
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = "rgba(124, 58, 237, 0.5)";
        ctx.fill();
      } else if (mode === "lost-node") {
        // Regular nodes
        ctx.beginPath();
        for (let i = 1; i < nodes.length; i++) {
          const node = nodes[i];
          ctx.moveTo(node.x + node.radius, node.y);
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = "rgba(124, 58, 237, 0.6)";
        ctx.fill();

        // Lost node with pulsing glow
        if (lostNode) {
          const pulse = Math.sin(timeRef.current * 3) * 0.3 + 0.7;
          const glowSize = 40 * pulse;

          const gradient = ctx.createRadialGradient(
            lostNode.x, lostNode.y, 0,
            lostNode.x, lostNode.y, glowSize
          );
          gradient.addColorStop(0, `rgba(244, 114, 182, ${0.6 * pulse})`);
          gradient.addColorStop(0.5, `rgba(224, 47, 135, ${0.3 * pulse})`);
          gradient.addColorStop(1, "rgba(124, 58, 237, 0)");
          ctx.beginPath();
          ctx.arc(lostNode.x, lostNode.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(lostNode.x, lostNode.y, lostNode.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 114, 182, ${0.8 + pulse * 0.2})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(lostNode.x, lostNode.y, lostNode.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + pulse * 0.3})`;
          ctx.fill();

          // Question mark
          ctx.font = "bold 24px Inter, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + pulse * 0.4})`;
          ctx.fillText("?", lostNode.x, lostNode.y - 25);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const startTimeout = setTimeout(() => {
      animationRef.current = requestAnimationFrame(draw);
    }, 50);

    return () => {
      clearTimeout(startTimeout);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (mode === "interactive") {
        window.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [mode, density, showBackground, initNodes, buildConnections, initTravelingLights]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      {children && (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  );
}
