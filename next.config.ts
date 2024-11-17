import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.freepik.com",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			{
				protocol: "https",
				hostname: "zznowsmhh7nhkhuj.public.blob.vercel-storage.com",
				port: "",
			},
		],
	},
}

export default nextConfig
