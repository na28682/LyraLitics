/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove deprecated appDir option
  images: {
    domains: ['localhost', 'api.lyralytics.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
  // Add webpack configuration to handle potential issues
  webpack: (config, { isServer }) => {
    // Fix for potential CSS processing issues
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.test && oneOfRule.test.test('.css')) {
            oneOfRule.use.forEach((useItem) => {
              if (useItem.loader && useItem.loader.includes('css-loader')) {
                useItem.options = {
                  ...useItem.options,
                  importLoaders: 1,
                };
              }
            });
          }
        });
      }
    });
    
    return config;
  },
}

module.exports = nextConfig 