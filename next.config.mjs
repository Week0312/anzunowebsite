/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    poweredByHeader: false,
    images: {
        domains: [], // 必要に応じて外部画像ドメインを追加
    },
    // experimental: {
    //     optimizeFonts: true, // この行を削除またはコメントアウト
    // },
};

export default nextConfig;
