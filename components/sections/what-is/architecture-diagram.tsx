import { cn } from "@/lib/utils";

export interface ArchitectureDiagramProps {
  className?: string;
}

export function ArchitectureDiagram({ className }: ArchitectureDiagramProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Glow behind card */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-primary/20 via-magenta/10 to-pink-light/20 blur-2xl animate-pulse-glow" />
      
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] p-6 shadow-2xl lg:aspect-[4/3]">
        {/* Illustrative example label */}
        <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-md bg-white/5 border border-white/10">
          <span className="text-[8px] font-mono text-white/40 italic">illustrative example</span>
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        {/* Layer 1: One-Click Deploy + API (Top) */}
        <div className="relative mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-green-400/80 uppercase tracking-wider">Deploy & Serve</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-green-400/30 bg-green-400/10">
              <svg className="h-2.5 w-2.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[8px] font-mono text-green-400">deployed</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-purple-primary/30 bg-purple-primary/10 px-3 py-2">
            <code className="text-xs font-mono text-purple-300">POST /v1/chat/completions</code>
            <div className="ml-auto flex gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping [animation-duration:2s]" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping [animation-delay:0.3s] [animation-duration:2s]" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping [animation-delay:0.6s] [animation-duration:2s]" />
            </div>
          </div>
        </div>

        {/* Animated flow line */}
        <div className="relative h-6 flex justify-center">
          <div className="w-px bg-gradient-to-b from-purple-primary/50 to-magenta/50 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-purple-primary animate-bounce [animation-duration:1s]" />
          </div>
        </div>

        {/* Layer 2: Runtime Orchestrator (Middle) */}
        <div className="relative mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-magenta animate-pulse" />
            <span className="text-[10px] font-mono text-magenta/80 uppercase tracking-wider">Runtime Orchestrator</span>
          </div>
          <div className="rounded-lg border border-magenta/30 bg-magenta/10 p-3">
            <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <svg className="h-3 w-3 text-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                <span className="text-white/70">route</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white/70">health</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-3 w-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-white/70">scale</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated flow lines to GPUs */}
        <div className="relative h-6 flex justify-center gap-8">
          <div className="w-px bg-gradient-to-b from-magenta/50 to-pink-light/50 relative -rotate-12 origin-top">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-magenta animate-bounce [animation-duration:1.2s]" />
          </div>
          <div className="w-px bg-gradient-to-b from-magenta/50 to-pink-light/50 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-magenta animate-bounce [animation-delay:0.2s] [animation-duration:1.2s]" />
          </div>
          <div className="w-px bg-gradient-to-b from-magenta/50 to-pink-light/50 relative rotate-12 origin-top">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-magenta animate-bounce [animation-delay:0.4s] [animation-duration:1.2s]" />
          </div>
        </div>

        {/* Layer 3: GPU Fabric with Cost-Optimized Tiers */}
        <div className="relative mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-pink-light animate-pulse" />
              <span className="text-[10px] font-mono text-pink-light/80 uppercase tracking-wider">GPU Fabric</span>
            </div>
            <span className="text-[8px] font-mono text-yellow-400/70">usage-based pricing</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {/* GPU Tier E - Economy */}
            <div className="rounded-lg border border-green-400/30 bg-green-400/10 p-2 text-center relative">
              <div className="absolute -top-1 -right-1 px-1 py-0.5 rounded text-[6px] font-mono bg-green-400/20 text-green-400 border border-green-400/30">$</div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span className="text-[9px] font-mono text-green-400">Tier E</span>
              </div>
              <div className="text-[8px] text-white/50">economy</div>
            </div>
            {/* GPU Tier B - Standard */}
            <div className="rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-2 text-center relative">
              <div className="absolute -top-1 -right-1 px-1 py-0.5 rounded text-[6px] font-mono bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">$</div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <svg className="h-3 w-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span className="text-[9px] font-mono text-yellow-400">Tier S</span>
              </div>
              <div className="text-[8px] text-white/50">standard</div>
            </div>
            {/* GPU Tier C - Premium */}
            <div className="rounded-lg border border-purple-primary/30 bg-purple-primary/10 p-2 text-center relative">
              <div className="absolute -top-1 -right-1 px-1 py-0.5 rounded text-[6px] font-mono bg-purple-primary/20 text-purple-primary border border-purple-primary/30">$$</div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <svg className="h-3 w-3 text-purple-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span className="text-[9px] font-mono text-purple-primary">Tier P</span>
              </div>
              <div className="text-[8px] text-white/50">performance</div>
            </div>
          </div>
        </div>

        {/* Layer 4: Metrics & Cost (Bottom bar) */}
        <div className="relative mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider">Observability</span>
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono">
            <div className="flex items-center gap-1">
              <span className="text-white/50">latency:</span>
              <span className="text-cyan-400">p50</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/50">throughput:</span>
              <span className="text-cyan-400">reqs/s</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/50">cost:</span>
              <span className="text-green-400">$/token</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
