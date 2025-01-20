/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,  // Bỏ qua lỗi TypeScript
    },
    eslint: {
        ignoreDuringBuilds: true,  // Bỏ qua lỗi ESLint
    },
};

export default nextConfig;
