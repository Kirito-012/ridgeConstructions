/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com'],
	},
	/* config options here */
	reactCompiler: true,
	output: 'export',
}

export default nextConfig
