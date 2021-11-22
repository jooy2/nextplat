const withFonts = require('next-fonts');
const { i18n } = require('./next-i18next.config');

module.exports = withFonts({
  i18n,
  eslint: {
    ignoreDuringBuilds: true,
  },
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    }
    return `${new Date().getTime()}`;
  },
  webpack: (config, { webpack, isServer }) => {
    const envs = {};
    Object.keys(process.env).forEach(env => {
      if (env.startsWith('NEXT_PUBLIC_')) {
        envs[env] = process.env[env];
      }
    });
    if (!isServer) {
      config.plugins.push(new webpack.DefinePlugin({
        'process.env': JSON.stringify(envs),
      }));
    }
    return config;
  },
});
