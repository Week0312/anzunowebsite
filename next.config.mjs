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
        outputFileTracingRoot: undefined,
    },

    // experimentalから移動してcacheHandlerとして設定
    cacheHandler: join(__dirname, "./src/lib/cache-handler.js"),

    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
