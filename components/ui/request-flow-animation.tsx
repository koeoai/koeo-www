"use client";

import { useEffect, useState } from "react";

// Koeo logo icon paths for inline SVG
const LOGO_PATH_LEFT =
  "M35.093 81.065 L34.259 80.880 L30.463 78.472 L29.722 78.287 " +
  "L27.685 76.898 L8.611 66.157 L8.287 65.926 L8.194 64.815 " +
  "L8.194 35.000 L34.444 19.583 L35.000 19.583 L37.315 20.880 " +
  "L61.435 34.722 L61.435 35.093 L60.926 35.417 L35.046 50.370 " +
  "L35.093 81.065 Z";

const LOGO_PATH_TOP =
  "M65.185 63.287 L64.861 63.241 L64.676 32.593 L38.194 17.315 " +
  "L38.333 16.991 L45.185 12.917 L48.148 11.435 L58.333 5.231 " +
  "L59.074 5.046 L64.537 1.806 L65.463 1.991 L70.556 4.861 " +
  "L74.352 7.269 L75.093 7.454 L87.778 14.954 L90.741 16.435 " +
  "L91.528 17.222 L91.528 47.870 L65.185 63.287 Z";

const LOGO_PATH_BOTTOM =
  "M65.185 98.194 L38.380 82.870 L38.333 52.083 L39.167 52.269 " +
  "L65.093 67.176 L82.685 56.713 L83.426 56.528 L84.259 55.787 " +
  "L85.000 55.602 L91.019 51.898 L91.528 51.852 L91.620 82.778 " +
  "L65.185 98.194 Z";

interface GpuNodeProps {
  isFailed: boolean;
  isActive: boolean;
  utilization: number;
}

function GpuNode({ isFailed, isActive, utilization }: GpuNodeProps) {
  return (
    <div
      className={`flex h-11 w-11 flex-col items-center justify-center rounded-lg border transition-all duration-300 sm:h-12 sm:w-12 ${
        isFailed
          ? "border-red-500 bg-red-500/30 shadow-lg shadow-red-500/40"
          : isActive
            ? "border-pink-light bg-gradient-to-br from-magenta/60 to-pink-light/60 shadow-lg shadow-pink-light/50"
            : "border-white/20 bg-white/10"
      }`}
    >
      {isFailed ? (
        <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <>
          <svg
            className={`h-4 w-4 transition-colors duration-300 ${isActive ? "text-white" : "text-pink-light/70"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
          <div className="mt-0.5 h-1 w-6 overflow-hidden rounded-full bg-white/20">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isActive ? "bg-gradient-to-r from-white to-pink-light" : "bg-pink-light/50"
              }`}
              style={{ width: `${utilization}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

// Animated request flow with GPU network and failover demonstration
// Phase flow:
// 0: App → Runtime (request)
// 1: Runtime → GPU (routing)
// 2: GPU processing
// 3: GPU → Runtime (response)
// 4: Runtime → App (success) ✓
// 5: App → Runtime (new request)
// 6: Runtime → GPU (GPU fails!) - error bounces back to runtime
// 7: Runtime reroutes to healthy GPU
// 8: Healthy GPU processing
// 9: GPU → Runtime (response)
// 10: Runtime → App (success) ✓
export function RequestFlowAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 11);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // Derive GPU state from phase instead of using effects
  const failedGpu: number | null = phase >= 6 ? 1 : null;
  const activeGpu: number = phase >= 7 ? 2 : 1;
  const gpuUtilization = (() => {
    if (phase === 0 || phase === 5) return [15, 0, 20, 10];
    if (phase === 2) return [20, 92, 25, 15];
    if (phase === 3 || phase === 4) return [15, 50, 20, 12];
    if (phase === 6) return [20, 0, 25, 18];
    if (phase === 7) return [20, 0, 30, 15];
    if (phase === 8) return [25, 0, 90, 20];
    if (phase === 9 || phase === 10) return [18, 0, 55, 15];
    return [15, 0, 20, 10];
  })();

  const isProcessing = phase === 2 || phase === 8;
  const isAppHighlighted = phase === 4 || phase === 10;
  const isFailoverMode = phase >= 6 && phase <= 9;
  const isRuntimeActive = (phase >= 0 && phase <= 4) || phase === 10;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {/* Main visualization - horizontal layout */}
      <div className="flex items-center justify-center px-4 py-8 sm:px-6">
        {/* Your App */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 ${
              isAppHighlighted
                ? "border-green-400 bg-green-400/20 shadow-lg shadow-green-400/30"
                : "border-white/20 bg-white/10"
            }`}
          >
            <svg
              className={`h-7 w-7 transition-colors duration-300 ${isAppHighlighted ? "text-green-400" : "text-white/70"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="text-xs text-white/50">Your App</span>
        </div>

        {/* Connection: App to Runtime */}
        <div className="relative mx-3 h-1.5 w-12 overflow-hidden rounded-full bg-white/10 sm:mx-4 sm:w-16">
          {(phase === 0 || phase === 5) && (
            <div
              className="absolute h-full w-6 rounded-full bg-gradient-to-r from-purple-primary to-magenta"
              style={{ animation: "flow-right 1.2s ease-in-out forwards" }}
            />
          )}
          {(phase === 4 || phase === 10) && (
            <div
              className="absolute h-full w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-300"
              style={{ animation: "flow-left 1.2s ease-in-out forwards" }}
            />
          )}
        </div>

        {/* Runtime */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 ${
              isRuntimeActive
                ? "border-pink-light/50 bg-gradient-to-br from-purple-primary/40 to-magenta/40 shadow-lg shadow-magenta/30"
                : isFailoverMode
                  ? "border-yellow-400/50 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 shadow-lg shadow-yellow-500/20"
                  : "border-pink-light/30 bg-gradient-to-br from-purple-primary/30 to-magenta/30"
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="logoGradientFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isFailoverMode ? "#EAB308" : "#7C3AED"} />
                  <stop offset="100%" stopColor={isFailoverMode ? "#F97316" : "#E02F87"} />
                </linearGradient>
              </defs>
              <path d={LOGO_PATH_LEFT} fill="url(#logoGradientFlow)" />
              <path d={LOGO_PATH_TOP} fill="url(#logoGradientFlow)" />
              <path d={LOGO_PATH_BOTTOM} fill="url(#logoGradientFlow)" />
            </svg>
          </div>
          <span className="text-xs text-white/50">Runtime</span>
        </div>

        {/* Connection: Runtime to GPU Network */}
        <div className="relative mx-3 h-1.5 w-12 overflow-hidden rounded-full bg-white/10 sm:mx-4 sm:w-16">
          {phase === 1 && (
            <div
              className="absolute h-full w-6 rounded-full bg-gradient-to-r from-magenta to-pink-light"
              style={{ animation: "flow-right 1.2s ease-in-out forwards" }}
            />
          )}
          {phase === 3 && (
            <div
              className="absolute h-full w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-300"
              style={{ animation: "flow-left 1.2s ease-in-out forwards" }}
            />
          )}
          {phase === 6 && (
            <div
              className="absolute h-full w-6 rounded-full bg-gradient-to-r from-red-400 to-red-500"
              style={{ animation: "flow-right 1.2s ease-in-out forwards" }}
            />
          )}
          {phase === 7 && (
            <div
              className="absolute h-full w-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
              style={{ animation: "flow-right 1.2s ease-in-out forwards" }}
            />
          )}
          {phase === 9 && (
            <div
              className="absolute h-full w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-300"
              style={{ animation: "flow-left 1.2s ease-in-out forwards" }}
            />
          )}
        </div>

        {/* GPU Network */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] items-center justify-items-center gap-0">
              <GpuNode isFailed={failedGpu === 0} isActive={activeGpu === 0 && isProcessing} utilization={gpuUtilization[0]} />
              <div className={`h-0.5 w-6 rounded-full transition-colors duration-300 ${phase === 7 ? "bg-yellow-400" : "bg-gradient-to-r from-purple-primary/50 to-magenta/50"}`} />
              <GpuNode isFailed={failedGpu === 1} isActive={activeGpu === 1 && isProcessing} utilization={gpuUtilization[1]} />

              <div className={`h-6 w-0.5 rounded-full transition-colors duration-300 ${phase === 7 ? "bg-yellow-400" : "bg-gradient-to-b from-purple-primary/50 to-magenta/50"}`} />
              <div />
              <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-purple-primary/50 to-magenta/50" />

              <GpuNode isFailed={failedGpu === 2} isActive={activeGpu === 2 && isProcessing} utilization={gpuUtilization[2]} />
              <div className="h-0.5 w-6 rounded-full bg-gradient-to-r from-purple-primary/50 to-magenta/50" />
              <GpuNode isFailed={failedGpu === 3} isActive={activeGpu === 3 && isProcessing} utilization={gpuUtilization[3]} />
            </div>
          </div>
          <span className="text-xs text-white/50">GPU Network</span>
        </div>
      </div>

      {/* Status indicator */}
      <div className="border-t border-white/5 bg-black/20 px-4 py-2.5 text-center">
        <span
          className={`text-xs font-medium transition-all duration-300 ${
            phase === 0 || phase === 1 || phase === 5
              ? "text-green-400"
              : phase === 2 || phase === 8
                ? "text-pink-light"
                : phase === 3 || phase === 4 || phase === 9 || phase === 10
                  ? "text-green-400"
                  : phase === 6
                    ? "text-red-400"
                    : phase === 7
                      ? "text-yellow-400"
                      : "text-white/50"
          }`}
        >
          {phase === 0 && "→ Sending request..."}
          {phase === 1 && "→ Routing to GPU..."}
          {phase === 2 && "⚡ Processing inference..."}
          {phase === 3 && "← Streaming response..."}
          {phase === 4 && "✓ Request complete"}
          {phase === 5 && "→ New request..."}
          {phase === 6 && "✕ GPU node failed!"}
          {phase === 7 && "↻ Runtime rerouting..."}
          {phase === 8 && "⚡ Processing on healthy GPU..."}
          {phase === 9 && "← Streaming response..."}
          {phase === 10 && "✓ Request complete"}
        </span>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes flow-right {
          0% { left: -30%; opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes flow-left {
          0% { right: -30%; left: auto; opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { right: 100%; left: auto; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
