var mongoose = require('mongoose');
mongoose.Promise=require('bluebird');
var db = require('../lib/db');
var ObjectId=mongoose.Schema.Types.ObjectId;

var CommentSchema = mongoose.Schema({

  content: {
    type: String
  },
  create_at:{
    type:Date,
    default: Date.now
  },
  update_at:{
    type:Date,
    default: Date.now
  },
  question_id:{
    type:ObjectId
  },
  author_id: {
    type: ObjectId
  },
  reply_to_id:{
    type:ObjectId
  }
});


// 获取评论列表
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
