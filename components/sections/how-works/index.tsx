import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";
import { DeveloperFeatures } from "./developer-features";
import { BetaSteps } from "./beta-steps";

export interface HowWorksSectionProps {
  className?: string;
}

export function HowWorksSection({ className }: HowWorksSectionProps) {
  return (
    <Section 
      id="how-it-works" 
      className={cn("!py-0 !bg-white", className)}
    >
      {/* Single continuous gradient background for entire section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C4B5FD] via-30% to-[#4C1D95]" />
      
      {/* Dark Top Section */}
      <div className="relative overflow-hidden pb-40 pt-24 md:pb-48 md:pt-32">
        {/* Network background */}
        <NetworkBackground variant="light" density="sparse" className="opacity-50" />

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Left: Headline - Custom layout, not using SectionHeader due to split design */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
                Built by Developers,
                <br />
                <span className="bg-gradient-to-r from-purple-primary to-magenta bg-clip-text text-transparent">for Developers</span>
              </h2>
              <p className="mt-4 text-base text-text-primary/60">
                Developer-first experience, even in beta
              </p>
            </div>

            {/* Right: Feature Columns */}
            <DeveloperFeatures />
          </div>
        </Container>
      </div>

      {/* White Card Overlay */}
      <div className="relative z-20 -mt-24 pb-24 md:-mt-32 md:pb-32">
        {/* Network background */}
        <NetworkBackground variant="dark" density="sparse" />
        
        <Container className="relative">
          {/* Card glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-primary/20 via-magenta/10 to-pink-light/20 blur-2xl" />
          
          <BetaSteps />
        </Container>
      </div>
    </Section>
  );
}

// Re-export sub-components for direct access if needed
export { DeveloperFeatures } from "./developer-features";
export { BetaSteps } from "./beta-steps";
