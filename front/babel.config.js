"use strict";

const babelConfig = () => {
  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript",
      "@babel/preset-react",
    ],
  };
};

module.exports = babelConfig();
