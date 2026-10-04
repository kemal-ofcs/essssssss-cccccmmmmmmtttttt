import type { NextConfig } from "next";

const isMobileBuild =
  process.env.APP_BUILD_TARGET === "mobile" ||
  process.env.NEXT_PUBLIC_APP_RUNTIME === "mobile" ||
  process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isMobileBuild ? { output: "export" as const } : {}),
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
