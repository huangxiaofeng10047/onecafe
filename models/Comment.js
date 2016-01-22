var mongoose = require('mongoose');
mongoose.Promise=require('bluebird');
var db = require('../lib/db');
var ObjectId=mongoose.Schema.Types.ObjectId;

var CommentSchema = mongoose.Schema({

  title:{
    type:String
  },
  content: {
    type: String
  },
  question_id:{
    type:ObjectId
  },
  author: {
    type: String
  },
  master:{
    type:String
  }
});


// 获取评论列表
CommentSchema.static('getCommentList', function(username,callback) {

  return this.find({
    master_id:username
  }, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    callback(docs);
  });

});
// 删除单个评论
CommentSchema.static('delComment', function(id,callback) {

  return this.findOneAndRemove({
    _id:id
  }, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    callback();
  });

});
// 删除文章所有评论
CommentSchema.static('delComments', function(id,callback) {

  return this.remove({
    question:id
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
