const webpack = require('webpack');

module.exports = function override(config) {
  // Solution pour react-scripts v5
  config.resolve = {
    ...config.resolve,
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util"),
      "zlib": false
    }
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ];

  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};