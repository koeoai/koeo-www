import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuration (Requirements: 7.4, 6.5)
  images: {
    // Enable modern image formats for automatic optimization
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for the `sizes` attribute
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize image size for better Core Web Vitals
    minimumCacheTTL: 60,
  },

  // Security headers configuration (Requirements: 11.2)
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          {
            // Prevent MIME type sniffing
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Prevent clickjacking attacks
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Enable XSS protection in older browsers
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // Control referrer information
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Permissions policy to control browser features
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            // Content Security Policy - balanced for Next.js compatibility
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
