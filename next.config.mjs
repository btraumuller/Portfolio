import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    // adjust the folder name if needed
    includePaths: [path.join(process.cwd(), 'src', 'app', 'globalStyles')],
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '' },
      { protocol: 'http', hostname: 'btraumullerportfoliocom.local', port: '' },
      { protocol: 'https', hostname: 'btraumuller-portfolio-new.flywheelsites.com', port: '' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '' },
      { protocol: 'https', hostname: 'plus.unsplash.com', port: '' },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
