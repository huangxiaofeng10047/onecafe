var webpack = require('webpack');
var _baseUrl=__dirname+'/public/src/js/';
module.exports = {
  entry: {
    index: _baseUrl+'index.js',
    create:_baseUrl+'create.js',
    question:_baseUrl+'question.js'
  },
  output: {
    path: __dirname+'/public/assets/js',
    filename: '[name].js'
  }
};
