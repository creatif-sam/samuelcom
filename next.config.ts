import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // faith.samuelgyasi.com → /faith (root)
      {
        source: "/",
        has: [{ type: "host", value: "faith.samuelgyasi.com" }],
        destination: "/faith",
      },
      // faith.samuelgyasi.com/blog → /faith/blog, etc.
      {
        source: "/:path*",
        has: [{ type: "host", value: "faith.samuelgyasi.com" }],
        destination: "/faith/:path*",
      },
    ];
  },
};

export default nextConfig;
