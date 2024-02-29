/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    // Existing rule for .svg files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // Add a new rule for .glb files
    config.module.rules.push({
      test: /\.glb$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
            publicPath: '/_next/', 
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
