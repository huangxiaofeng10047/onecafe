var mongoose = require('mongoose');
var db = require('./db');

var CommentSchema = mongoose.Schema({
  id: {
    type: Number
  },
  title:{
    type:String
  },
  content: {
    type: String
  },
  article:{
    type:String
  },
  author: {
    type: String
  }
});

CommentSchema.static('getLastId', function(callback) {

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
CommentSchema.static('getCommentList', function(username,callback) {

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

var Comment = db.model('Comment', CommentSchema);

module.exports = Comment;
