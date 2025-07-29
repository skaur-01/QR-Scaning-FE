/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    lightningcss: {
      drafts: {
        customMedia: true,
        customProperties: true,
        nesting: true,
        colorMix: false,
        labFunction: false, // <- disable lab()/oklab()
      },
    },
  },
};

module.exports = nextConfig;
