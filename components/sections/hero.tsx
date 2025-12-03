"use client";

import * as React from "react";
import { NeuralNetworkCanvas } from "./neural-network-canvas";

export interface HeroProps {
  className?: string;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(({ className }, ref) => {
  return (
    <section ref={ref} className={className}>
      <NeuralNetworkCanvas />
    </section>
  );
});
Hero.displayName = "Hero";

export { Hero };
