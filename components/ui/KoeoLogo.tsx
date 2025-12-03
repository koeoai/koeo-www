import * as React from "react";
import { cn } from "@/lib/utils";

export interface KoeoLogoProps {
  size?: number;
  showWordmark?: boolean;
  variant?: "gradient" | "white" | "dark";
  className?: string;
}

const PATH_LEFT =
  "M35.093 81.065 L34.259 80.880 L30.463 78.472 L29.722 78.287 " +
  "L27.685 76.898 L8.611 66.157 L8.287 65.926 L8.194 64.815 " +
  "L8.194 35.000 L34.444 19.583 L35.000 19.583 L37.315 20.880 " +
  "L61.435 34.722 L61.435 35.093 L60.926 35.417 L35.046 50.370 " +
  "L35.093 81.065 Z";

const PATH_TOP =
  "M65.185 63.287 L64.861 63.241 L64.676 32.593 L38.194 17.315 " +
  "L38.333 16.991 L45.185 12.917 L48.148 11.435 L58.333 5.231 " +
  "L59.074 5.046 L64.537 1.806 L65.463 1.991 L70.556 4.861 " +
  "L74.352 7.269 L75.093 7.454 L87.778 14.954 L90.741 16.435 " +
  "L91.528 17.222 L91.528 47.870 L65.185 63.287 Z";

const PATH_BOTTOM =
  "M65.185 98.194 L38.380 82.870 L38.333 52.083 L39.167 52.269 " +
  "L65.093 67.176 L82.685 56.713 L83.426 56.528 L84.259 55.787 " +
  "L85.000 55.602 L91.019 51.898 L91.528 51.852 L91.620 82.778 " +
  "L65.185 98.194 Z";

export const KoeoLogo = React.forwardRef<HTMLDivElement, KoeoLogoProps>(
  (
    { size = 32, showWordmark = true, variant = "gradient", className },
    ref
  ) => {
    const iconSize = size;

    // Use CSS variable values for colors
    const baseColor =
      variant === "white"
        ? "var(--text-light)"
        : "var(--text-primary)";
    const wordmarkColor =
      variant === "white"
        ? "var(--text-light)"
        : "var(--text-primary)";

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        style={{ gap: `${size * 0.15}px` }}
        role="img"
        aria-label="Koeo logo"
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {variant === "gradient" && (
            <defs>
              <linearGradient
                id="koeoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--purple-primary)" />
                <stop offset="100%" stopColor="var(--magenta)" />
              </linearGradient>
            </defs>
          )}
          <path
            d={PATH_LEFT}
            fill={variant === "gradient" ? "url(#koeoGradient)" : baseColor}
          />
          <path
            d={PATH_TOP}
            fill={variant === "gradient" ? "url(#koeoGradient)" : baseColor}
          />
          <path
            d={PATH_BOTTOM}
            fill={variant === "gradient" ? "url(#koeoGradient)" : baseColor}
          />
        </svg>

        {showWordmark && (
          <span
            style={{
              fontFamily: '"Outfit", system-ui, sans-serif',
              fontSize: `${size * 0.73}px`,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: wordmarkColor,
              lineHeight: 1,
              marginTop: `${size * 0.02}px`,
            }}
          >
            koeo
          </span>
        )}
      </div>
    );
  }
);

KoeoLogo.displayName = "KoeoLogo";
