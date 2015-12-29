var mongoose = require('mongoose');
var db = require('./db');

var ArticleSchema = mongoose.Schema({
  id: {
    type: Number
  },
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

ArticleSchema.static('getLastId', function(callback) {

  return this.find({}, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    if (!docs.length) {
      callback(0);
      return;
    }
    callback(docs[docs.length - 1].id);
  });

});

ArticleSchema.static('getArticleList', function(username,callback) {

  return this.find({
    author:username
  }, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    callback(docs);
  });

});

var Article = db.model('Article', ArticleSchema);

module.exports = Article;
