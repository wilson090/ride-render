const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: (config) => {
    // Expose the MAPBOX_API_KEY to the client-side code
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.MAPBOX_API_KEY': JSON.stringify(process.env.MAPBOX_API_KEY),
      })
    );
    // Add a rule to handle .geojson files
    config.module.rules.push({
      test: /\.geojson$/,
      include: path.resolve(__dirname, './public/example_ride/ride.geojson'),
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    });

    return config;
  },
};
