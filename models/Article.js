var mongoose = require('mongoose');
var db = require('./db');

var ArticleSchema = mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  }
});

var Article = db.model('Article', ArticleSchema);

module.exports = Article;
