/** @type {import('next').NextConfig} */
const hostnames = [
  'i.ytimg.com',
  'img.youtube.com'
]

const nextConfig = {
  images: {
    // domains: ["i.ytimg.com", "img.youtube.com"],
    remotePatterns: hostnames.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
};

export default nextConfig;
