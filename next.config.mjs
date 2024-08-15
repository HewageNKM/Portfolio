/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"export",
    distDir:"dist",
    typescript:{
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
