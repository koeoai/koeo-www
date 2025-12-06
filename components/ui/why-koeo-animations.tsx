"use client";

import { useEffect, useState } from "react";

// Animation 1: Server Rack with live GPU activity
export function ServerRackAnimation() {
  const [gpuLoads, setGpuLoads] = useState([65, 88, 42, 71]);
  const [activeGpu, setActiveGpu] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through GPUs showing activity
      setActiveGpu((prev) => (prev + 1) % 4);
      // Randomize loads slightly
      setGpuLoads((prev) =>
        prev.map((load) => Math.min(100, Math.max(20, load + (Math.random() - 0.5) * 20)))
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full max-w-sm rounded-2xl border border-white/10 bg-gradient-to-br from-purple-deep/50 to-purple-primary/20 p-6 backdrop-blur-sm">
      {/* Incoming request indicator */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/90 px-3 py-1 text-xs text-pink-light">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
          </span>
          Requests incoming
        </div>
      </div>

      {/* Server Units */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`mb-3 flex items-center gap-3 rounded-lg border p-3 transition-all duration-300 ${
            activeGpu === i
              ? "border-pink-light/50 bg-pink-light/10"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="flex gap-1">
            <div
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                activeGpu === i ? "bg-green-400 animate-pulse" : "bg-green-400/50"
              }`}
            />
            <div
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                gpuLoads[i] > 80 ? "bg-yellow-400" : "bg-white/20"
              }`}
            />
          </div>
          <div className="flex-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-primary to-pink-light transition-all duration-500"
                style={{ width: `${gpuLoads[i]}%` }}
              />
            </div>
          </div>
          <span
            className={`font-mono text-xs transition-colors duration-300 ${
              activeGpu === i ? "text-pink-light" : "text-white/40"
            }`}
          >
            GPU {i}
          </span>
        </div>
      ))}

      {/* Floating label */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-pink-light/30 bg-purple-deep/80 px-4 py-1 text-xs text-pink-light backdrop-blur-sm">
        Managed by KOEO
      </div>
    </div>
  );
}


// Koeo logo paths
const LOGO_PATH_LEFT =
  "M35.093 81.065 L34.259 80.880 L30.463 78.472 L29.722 78.287 L27.685 76.898 L8.611 66.157 L8.287 65.926 L8.194 64.815 L8.194 35.000 L34.444 19.583 L35.000 19.583 L37.315 20.880 L61.435 34.722 L61.435 35.093 L60.926 35.417 L35.046 50.370 L35.093 81.065 Z";
const LOGO_PATH_TOP =
  "M65.185 63.287 L64.861 63.241 L64.676 32.593 L38.194 17.315 L38.333 16.991 L45.185 12.917 L48.148 11.435 L58.333 5.231 L59.074 5.046 L64.537 1.806 L65.463 1.991 L70.556 4.861 L74.352 7.269 L75.093 7.454 L87.778 14.954 L90.741 16.435 L91.528 17.222 L91.528 47.870 L65.185 63.287 Z";
const LOGO_PATH_BOTTOM =
  "M65.185 98.194 L38.380 82.870 L38.333 52.083 L39.167 52.269 L65.093 67.176 L82.685 56.713 L83.426 56.528 L84.259 55.787 L85.000 55.602 L91.019 51.898 L91.528 51.852 L91.620 82.778 L65.185 98.194 Z";

// Animation 2: Failover demonstration with request flow
export function FailoverAnimation() {
  const [phase, setPhase] = useState(0);
  // Phases: 0=routing to all, 1=node fails, 2=rerouting, 3=success on healthy node

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Line colors based on phase
  const getLineColor = (nodeId: number) => {
    if (nodeId === 1 && phase >= 1) return "#ef4444"; // Failed node - red
    if (nodeId === 0 && phase === 3) return "#22c55e"; // Success path - green
    if (nodeId === 2 && phase === 2) return "#eab308"; // Rerouting - yellow
    return "#7C3AED"; // Default purple
  };

  const getLineOpacity = (nodeId: number) => {
    if (nodeId === 1 && phase >= 1) return 0.3; // Failed - dim
    if (nodeId === 0 && phase === 3) return 1; // Active success
    if (nodeId === 2 && phase === 2) return 1; // Active reroute
    return 0.4;
  };

  return (
    <div className="relative h-64 w-full max-w-sm rounded-2xl border border-white/10 bg-gradient-to-br from-purple-deep/50 to-purple-primary/20 p-4 backdrop-blur-sm overflow-hidden">
      {/* Koeo Runtime - positioned at top center */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 z-10">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl border shadow-lg transition-all duration-300 ${
            phase === 2
              ? "border-yellow-400/50 bg-yellow-400/20 shadow-yellow-400/20"
              : "border-pink-light/50 bg-gradient-to-br from-purple-primary/40 to-magenta/40 shadow-magenta/20"
          }`}
        >
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="logoGradientFailover" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={phase === 2 ? "#EAB308" : "#7C3AED"} />
                <stop offset="100%" stopColor={phase === 2 ? "#F97316" : "#E02F87"} />
              </linearGradient>
            </defs>
            <path d={LOGO_PATH_LEFT} fill="url(#logoGradientFailover)" />
            <path d={LOGO_PATH_TOP} fill="url(#logoGradientFailover)" />
            <path d={LOGO_PATH_BOTTOM} fill="url(#logoGradientFailover)" />
          </svg>
        </div>
      </div>

      {/* Connection lines using percentage-based positioning */}
      {/* Container is h-64 (256px). Top box: top-4 (16px) + h-14 (56px) = bottom at 72px */}
      {/* Bottom nodes: bottom-14 (56px from bottom) + h-14 (56px) = top edge at 256-56-56 = 144px */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {/* Line to left node */}
        <line
          x1="50%" y1="72px"
          x2="20%" y2="144px"
          stroke={getLineColor(0)}
          strokeWidth="2"
          strokeDasharray={phase === 3 ? "0" : "4 4"}
          opacity={getLineOpacity(0)}
          className="transition-all duration-300"
        />

        {/* Line to center node (fails) */}
        <line
          x1="50%" y1="72px"
          x2="50%" y2="144px"
          stroke={getLineColor(1)}
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity={getLineOpacity(1)}
          className="transition-all duration-300"
        />

        {/* Line to right node */}
        <line
          x1="50%" y1="72px"
          x2="80%" y2="144px"
          stroke={getLineColor(2)}
          strokeWidth="2"
          strokeDasharray={phase === 2 ? "0" : "4 4"}
          opacity={getLineOpacity(2)}
          className="transition-all duration-300"
        />
      </svg>

      {/* GPU Nodes */}
      <div className="absolute bottom-14 left-[20%] -translate-x-1/2 z-10">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 ${
            phase === 3
              ? "border-green-400 bg-green-400/30 shadow-lg shadow-green-400/30"
              : "border-green-400/50 bg-green-400/20"
          }`}
        >
          <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 ${
            phase >= 1
              ? "border-red-400/50 bg-red-400/20"
              : "border-green-400/50 bg-green-400/20"
          }`}
        >
          {phase >= 1 ? (
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      <div className="absolute bottom-14 right-[20%] translate-x-1/2 z-10">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 ${
            phase === 2
              ? "border-yellow-400 bg-yellow-400/20"
              : "border-green-400/50 bg-green-400/20"
          }`}
        >
          <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Status indicator */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1 text-xs transition-all duration-300 z-10 ${
          phase === 1
            ? "border-red-400/30 bg-red-400/10 text-red-400"
            : phase === 2
              ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-400"
              : "border-green-400/30 bg-green-400/10 text-green-400"
        }`}
      >
        {phase === 0 && "● Routing request..."}
        {phase === 1 && "✕ Node failure detected"}
        {phase === 2 && "↻ Auto-rerouting..."}
        {phase === 3 && "✓ Request successful"}
      </div>
    </div>
  );
}


// Animation 3: Code migration diff with typing effect
export function CodeMigrationAnimation() {
  const [step, setStep] = useState(0);
  // Steps: 0=show openai, 1=highlight changes, 2=show koeo, 3=success

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a2e] font-mono text-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          <span className="ml-2 text-xs text-white/40">config.ts</span>
        </div>
        {step === 3 && (
          <span className="text-xs text-green-400">✓ Saved</span>
        )}
      </div>

      {/* Code content */}
      <div className="p-4 text-xs">
        <div className="flex">
          <span className="w-6 select-none text-white/20">1</span>
          <span className="text-white/50">const client = new OpenAI({`{`}</span>
        </div>

        {/* Base URL line */}
        <div
          className={`flex transition-all duration-300 ${
            step === 1 ? "bg-red-500/20" : step >= 2 ? "bg-green-500/10" : ""
          }`}
        >
          <span className={`w-6 select-none ${step === 1 ? "text-red-400" : step >= 2 ? "text-green-400" : "text-white/20"}`}>
            {step === 1 ? "-" : step >= 2 ? "+" : "2"}
          </span>
          <span className={step === 1 ? "text-red-400/80 line-through" : step >= 2 ? "text-green-400/80" : "text-white/50"}>
            {step >= 2 ? '  baseURL: "api.koeo.ai/v1",' : '  baseURL: "api.openai.com",'}
          </span>
        </div>

        {/* API Key line */}
        <div
          className={`flex transition-all duration-300 ${
            step === 1 ? "bg-red-500/20" : step >= 2 ? "bg-green-500/10" : ""
          }`}
        >
          <span className={`w-6 select-none ${step === 1 ? "text-red-400" : step >= 2 ? "text-green-400" : "text-white/20"}`}>
            {step === 1 ? "-" : step >= 2 ? "+" : "3"}
          </span>
          <span className={step === 1 ? "text-red-400/80 line-through" : step >= 2 ? "text-green-400/80" : "text-white/50"}>
            {step >= 2 ? "  apiKey: process.env.KOEO_KEY," : "  apiKey: process.env.OPENAI_KEY,"}
          </span>
        </div>

        <div className="flex">
          <span className="w-6 select-none text-white/20">4</span>
          <span className="text-white/50">{`}`});</span>
        </div>

        <div className="mt-3 flex">
          <span className="w-6 select-none text-white/20">5</span>
          <span className="text-white/30">// Everything else stays the same!</span>
        </div>
      </div>

      {/* Footer status */}
      <div
        className={`border-t border-white/10 px-4 py-2 text-center text-xs transition-all duration-300 ${
          step === 0
            ? "bg-white/5 text-white/40"
            : step === 1
              ? "bg-red-500/10 text-red-400"
              : step === 2
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-green-500/10 text-green-400"
        }`}
      >
        {step === 0 && "Current: OpenAI"}
        {step === 1 && "Changing 2 lines..."}
        {step === 2 && "Switching to KOEO..."}
        {step === 3 && "✓ Migration complete • Ready to deploy"}
      </div>
    </div>
  );
}
