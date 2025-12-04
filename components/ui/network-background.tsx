"use client";

import * as React from "react";
import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface NetworkBackgroundProps {
  className?: string;
  variant?: "dark" | "light";
  density?: "sparse" | "normal" | "dense";
  animated?: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface TravelingLight {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

const NODE_COUNTS = { sparse: 30, normal: 60, dense: 100 };
const CONNECTION_DISTANCE = 180;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const BASE_CONNECTION_ALPHA = 0.12;
const TRAVELING_LIGHT_COUNT = 8;

export function NetworkBackground({
  className,
  variant = "dark",
  density = "normal",
  animated = true,
}: NetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const lightsRef = useRef<TravelingLight[]>([]);
  const connectionsRef = useRef<{ from: number; to: number }[]>([]);
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  const nodeCount = NODE_COUNTS[density];

  const initNodes = useCallback((width: number, height: number): Node[] => {
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const speed = 0.1 + Math.random() * 0.2;
      const angle = Math.random() * Math.PI * 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.5 + Math.random() * 1,
      });
    }
    return nodes;
  }, [nodeCount]);

  const buildConnections = useCallback((nodes: Node[]) => {
    const connections: { from: number; to: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
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
  }, []);

  const initTravelingLights = useCallback((connections: { from: number; to: number }[]): TravelingLight[] => {
    if (connections.length === 0) return [];
    const lights: TravelingLight[] = [];
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

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

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

      nodesRef.current = initNodes(width, height);
      connectionsRef.current = buildConnections(nodesRef.current);
      lightsRef.current = initTravelingLights(connectionsRef.current);
    };

    resize();
    window.addEventListener("resize", resize);

    const isDark = variant === "dark";
    const nodeColor = isDark ? "rgba(124, 58, 237, 0.5)" : "rgba(124, 58, 237, 0.3)";
    const lineColor = isDark ? `rgba(124, 58, 237, ${BASE_CONNECTION_ALPHA})` : `rgba(124, 58, 237, 0.08)`;
    const glowColor = isDark ? "rgba(244, 114, 182, 0.8)" : "rgba(124, 58, 237, 0.6)";

    const draw = () => {
      if (!isVisibleRef.current || !animated) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const nodes = nodesRef.current;
      const lights = lightsRef.current;
      const connections = connectionsRef.current;

      ctx.clearRect(0, 0, width, height);

      // Update node positions (slow drift)
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      // Rebuild connections periodically (every ~60 frames worth of movement)
      if (Math.random() < 0.02) {
        connectionsRef.current = buildConnections(nodes);
      }

      // Draw base connections
      ctx.beginPath();
      for (const conn of connections) {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
      }
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Update and draw traveling lights
      for (let i = 0; i < lights.length; i++) {
        const light = lights[i];
        light.progress += light.speed;

        if (light.progress >= 1) {
          // Pick a new random connection
          if (connections.length > 0) {
            const connIndex = Math.floor(Math.random() * connections.length);
            light.fromNode = connections[connIndex].from;
            light.toNode = connections[connIndex].to;
            light.progress = 0;
            light.speed = 0.003 + Math.random() * 0.004;
          }
        }

        const from = nodes[light.fromNode];
        const to = nodes[light.toNode];
        if (!from || !to) continue;

        const x = from.x + (to.x - from.x) * light.progress;
        const y = from.y + (to.y - from.y) * light.progress;

        // Draw glowing traveling light
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(0.5, isDark ? "rgba(244, 114, 182, 0.3)" : "rgba(124, 58, 237, 0.2)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw bright core
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();

        // Draw glowing line segment behind the light
        const trailLength = 0.15;
        const trailStart = Math.max(0, light.progress - trailLength);
        const trailX = from.x + (to.x - from.x) * trailStart;
        const trailY = from.y + (to.y - from.y) * trailStart;

        const lineGradient = ctx.createLinearGradient(trailX, trailY, x, y);
        lineGradient.addColorStop(0, "rgba(244, 114, 182, 0)");
        lineGradient.addColorStop(1, isDark ? "rgba(244, 114, 182, 0.6)" : "rgba(124, 58, 237, 0.4)");
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw nodes
      ctx.beginPath();
      for (const node of nodes) {
        ctx.moveTo(node.x + node.radius, node.y);
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = nodeColor;
      ctx.fill();

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [variant, animated, initNodes, buildConnections, initTravelingLights]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
