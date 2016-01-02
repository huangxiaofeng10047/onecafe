var mongoose = require('mongoose');
mongoose.Promise=require('bluebird');
var db = require('../lib/db');

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

// 删除评论
CommentSchema.static('delComment', function(id,callback) {

  return this.findOneAndRemove({
    id:id
  }, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    callback();
  });

});

// 删除所有评论
CommentSchema.static('delComments', function(id,callback) {

  return this.remove({
    article:id
  }, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    callback();
  });

});


var Comment = db.model('Comment', CommentSchema);

module.exports = Comment;
