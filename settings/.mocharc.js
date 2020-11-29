"use strict";

module.exports = {
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'mocha-jenkins-reporter',
  reporterOptions: {
    },
  slow: 75,
  timeout: 25000,
  colors: true,
  watchFiles: ['./test/media-item-controller.js']
};