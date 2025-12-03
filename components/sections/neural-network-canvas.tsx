"use client";

import * as React from "react";
import { useRef, useEffect, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  energy: number;
}

interface NeuralNetworkCanvasProps {
  className?: string;
}



// Node density: ~1 node per 6000px² (e.g., 1920x1080 = ~345 nodes, 375x667 mobile = ~42 nodes)
const NODE_DENSITY = 6000;
const MIN_NODES = 40;
const MAX_NODES = 400;
const CONNECTION_DISTANCE = 120;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const HOVER_RADIUS = 200;
const HOVER_RADIUS_SQ = HOVER_RADIUS * HOVER_RADIUS;
const BASE_CONNECTION_ALPHA = 0.15;

function calculateNodeCount(width: number, height: number): number {
  const area = width * height;
  const count = Math.floor(area / NODE_DENSITY);
  return Math.max(MIN_NODES, Math.min(MAX_NODES, count));
}

export function NeuralNetworkCanvas({ className }: NeuralNetworkCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isVisibleRef = useRef(true);



  const initNodes = useCallback((width: number, height: number): Node[] => {
    const nodeCount = calculateNodeCount(width, height);
    const nodes: Node[] = new Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      // Organic movement with varying speeds
      const speed = 0.2 + Math.random() * 0.4;
      const angle = Math.random() * Math.PI * 2;
      nodes[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: (Math.random() * 2 + 2.5) * 0.85, // 15% smaller
        energy: 0,
      };
    }
    return nodes;
  }, []);


  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let bgGradient: CanvasGradient;

    // Pre-render glow sprites to offscreen canvas (HUGE perf win)
    const glowCanvas = document.createElement("canvas");
    const glowCtx = glowCanvas.getContext("2d")!;
    const GLOW_SIZE = 60;
    glowCanvas.width = GLOW_SIZE;
    glowCanvas.height = GLOW_SIZE;

    // Draw a reusable glow sprite
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

      // Pre-create background gradient
      bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "#2D1B4E");
      bgGradient.addColorStop(0.4, "#4C1D95");
      bgGradient.addColorStop(0.7, "#5B21B6");
      bgGradient.addColorStop(1, "#7C3AED");

      // Reinitialize nodes if count changes significantly (e.g., orientation change)
      const targetCount = calculateNodeCount(width, height);
      const currentCount = nodesRef.current.length;
      if (currentCount === 0 || Math.abs(targetCount - currentCount) > 20) {
        nodesRef.current = initNodes(width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("mouseleave", onMouseLeave);

    // Spatial grid
    const gridSize = CONNECTION_DISTANCE;
    const grid = new Map<string, number[]>();

    const buildGrid = (nodes: Node[]) => {
      grid.clear();
      for (let i = 0; i < nodes.length; i++) {
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

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Background
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Update positions & energy
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < HOVER_RADIUS_SQ) {
          node.energy = Math.max(node.energy, 1 - Math.sqrt(distSq) / HOVER_RADIUS);
        } else {
          node.energy *= 0.88; // Faster decay for quicker fade out
        }
        if (node.energy < 0.02) node.energy = 0;
      }

      buildGrid(nodes);

      // Propagate energy (single pass for performance)
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

      // BATCH ALL CONNECTIONS IN SINGLE PATH - massive perf improvement
      // Base connections (very subtle, almost invisible)
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

      // Energized connections (electric effect) - only when hovering
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
            // Electric gradient effect
            const alpha = 0.4 + maxEnergy * 0.6;
            ctx.strokeStyle = `rgba(244, 114, 182, ${alpha})`;
            ctx.lineWidth = 1 + maxEnergy * 2.5;
            ctx.stroke();
          }
        }
      }


      // Draw glow sprites for energized nodes (using pre-rendered canvas)
      for (const node of nodes) {
        if (node.energy > 0.1) {
          const size = GLOW_SIZE * (0.5 + node.energy);
          ctx.globalAlpha = node.energy;
          ctx.drawImage(
            glowCanvas,
            node.x - size / 2,
            node.y - size / 2,
            size,
            size
          );
        }
      }
      ctx.globalAlpha = 1;

      // Batch all non-energized nodes in single path (subtle)
      ctx.beginPath();
      for (const node of nodes) {
        if (node.energy <= 0.1) {
          ctx.moveTo(node.x + node.radius, node.y);
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        }
      }
      ctx.fillStyle = "rgba(124, 58, 237, 0.6)";
      ctx.fill();

      // Energized nodes - individual for color variation
      for (const node of nodes) {
        if (node.energy > 0.1) {
          const size = node.radius + node.energy * 4;

          // Main node
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 114, 182, ${0.8 + node.energy * 0.2})`;
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(node.x, node.y, size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + node.energy * 0.4})`;
          ctx.fill();
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
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initNodes]);

  return (
    <div ref={containerRef} className={`relative min-h-screen overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow Badge */}
          <div className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
            </span>
            Closed Beta
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Run your AI models{" "}
            <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
              without managing GPUs
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-text-light/80 sm:text-xl">
            Ship AI features faster. KOEO handles the GPU complexity so you can focus on building.
          </p>

          {/* CTAs */}
          <div className="pointer-events-auto flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/beta"
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 font-semibold text-white transition-all hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light focus-visible:ring-offset-2"
            >
              Join the Private Beta
            </a>
            <a
              href="/whitepaper.pdf"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light focus-visible:ring-offset-2"
            >
              Read the Whitepaper
            </a>
          </div>

          {/* Microcopy */}
          <p className="mt-6 text-sm text-text-light/60">
            We&apos;re gradually inviting teams into the private beta.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-deep/80 to-transparent" />
    </div>
  );
}
