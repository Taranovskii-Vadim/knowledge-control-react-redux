'use strict';

const autoprefixer = require('autoprefixer');
const postcssPresetEnvPlugin = require('postcss-preset-env');

const config = () => ({
  plugins: [
    postcssPresetEnvPlugin({
      importFrom: ['src/styles/variables.css'],
    }),
    autoprefixer({
      flexbox: 'no-2009',
      grid: 'autoplace',
    }),
  ],
});

module.exports = config;
