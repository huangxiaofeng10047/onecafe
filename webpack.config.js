var _baseUrl=__dirname+'/public/src/js/';
module.exports = {
  entry: {
    index: _baseUrl+'index.js',
    create:_baseUrl+'create.js',
    question:_baseUrl+'question.js',
    messages:_baseUrl+'messages.js',
    settings:_baseUrl+'settings.js'
  },
  output: {
    path: __dirname+'/public/assets/js',
    filename: '[name].js'
  }
};
