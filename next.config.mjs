/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/FuelMe' : '');

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'api.dicebear.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
};

export default nextConfig;
