var mongoose = require('mongoose');
mongoose.Promise=require('bluebird');
var db = require('../lib/db');
var moment = require('moment');
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


//格式化时间
CommentSchema.virtual('create_time').get(function () {
  return moment(this.create_at).format('x');
});

//格式化ID
CommentSchema.virtual('authorid').get(function () {
  return this.author_id.toString();
});



var Comment = db.model('Comment', CommentSchema);

module.exports = Comment;
