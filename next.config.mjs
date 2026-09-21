/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    outputFileTracingIncludes: {
      '/[locale]/cv/[slug]/opengraph-image': ['./assets/fonts/**'],
    },
  },
};

export default nextConfig;
