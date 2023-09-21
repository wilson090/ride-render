const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    // Expose the MAPBOX_API_KEY to the client-side code
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.MAPBOX_API_KEY': JSON.stringify(process.env.MAPBOX_API_KEY),
      })
    );
    return config;
  },
};
