var webpack = require('webpack');
module.exports = {
  entry: {
    index:__dirname+'/public/src/js/index.js',
    create:__dirname+'/public/src/js/create.js'
  },
  output: {
    path: __dirname+'/public/assets/js',
    filename: '[name].js'
  }
};
