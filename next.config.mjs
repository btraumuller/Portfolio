/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
            port:'',
          },
          {
            protocol: 'http',
            hostname: 'btraumullerportfoliocom.local',
            port:'',
          },
          {
              protocol: 'https',
              hostname: 'images.unsplash.com',
              port:''
            },
            {
              protocol: 'https',
              hostname: 'plus.unsplash.com',
              port:''
            }
        ]
        
      },
      reactStrictMode: false,
      
};




export default nextConfig;
