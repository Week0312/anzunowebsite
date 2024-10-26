/** @type {import('next').NextConfig} */
const nextConfig = {
    // 既存の設定を維持
    reactStrictMode: true,
    swcMinify: true,

    // パフォーマンス最適化
    experimental: {
        // モダンビルドの最適化
        optimizeCss: true,
        // キャッシングの改善
        incrementalCacheHandlerPath: require.resolve("./cache-handler.js"),
        // ビルド出力の最適化
        outputFileTracingRoot: undefined,
    },

    // 画像の最適化
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // webpack設定のカスタマイズ
    webpack: (config, { dev, isServer }) => {
        // 開発環境でのみ適用する最適化
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
