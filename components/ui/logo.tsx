import * as React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.SVGAttributes<SVGElement> {
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

const sizeMap = {
  sm: { icon: 24, text: 16 },
  default: { icon: 32, text: 20 },
  lg: { icon: 40, text: 24 },
};

const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ size = "default", showText = true, className, ...props }, ref) => {
    const dimensions = sizeMap[size] || sizeMap.default;
    const totalWidth = showText ? dimensions.icon + dimensions.text * 3 : dimensions.icon;

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${totalWidth} ${dimensions.icon}`}
        width={totalWidth}
        height={dimensions.icon}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Koeo logo"
        className={cn("inline-block", className)}
        {...props}
      >
        <defs>
          <linearGradient id="koeo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#E02F87" />
          </linearGradient>
        </defs>
        
        {/* Icon - Abstract K shape with gradient */}
        <circle
          cx={dimensions.icon / 2}
          cy={dimensions.icon / 2}
          r={dimensions.icon / 2 - 2}
          fill="url(#koeo-gradient)"
        />
        <path
          d={`M${dimensions.icon * 0.3} ${dimensions.icon * 0.25} 
              L${dimensions.icon * 0.3} ${dimensions.icon * 0.75} 
              M${dimensions.icon * 0.3} ${dimensions.icon * 0.5} 
              L${dimensions.icon * 0.7} ${dimensions.icon * 0.25} 
              M${dimensions.icon * 0.3} ${dimensions.icon * 0.5} 
              L${dimensions.icon * 0.7} ${dimensions.icon * 0.75}`}
          stroke="white"
          strokeWidth={dimensions.icon * 0.08}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Text - "koeo" */}
        {showText && (
          <text
            x={dimensions.icon + 8}
            y={dimensions.icon * 0.68}
            fill="#0F172A"
            fontSize={dimensions.text}
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
          >
            koeo
          </text>
        )}
      </svg>
    );
  }
);

Logo.displayName = "Logo";

export { Logo };
