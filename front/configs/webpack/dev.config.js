'use strict';

module.exports = {
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
};
