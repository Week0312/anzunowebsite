import { fileURLToPath } from "url";
import { dirname, join } from "path";

// __dirnameの代替設定（ES Modules用）
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        optimizeCss: true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.optimization = {
                ...config.optimization,
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                },
            };
        }
        return config;
    },
};

export default nextConfig;
