var Comment = require('../models/Comment');
var Message = require('../models/Message');
var Question = require('../models/Question');
var Promise = require('bluebird');

exports.create = function(req, res) {

  var newComment = {
    content: req.body.content,
    question_id: req.body.question_id,
    reply_to_id:req.body.reply_to_id,
    author_id: req.session.user._id
  };

  var commentJson={};
  Comment.create(newComment).then(function(comment) {
    commentJson=comment;
    return Question.findById(comment.question_id);
  }).then(function (question) {
    var newMessage={
      question_id:question._id,
      reply_to_id:question.author_id,
      author_id:req.session.user._id
    };
    return Message.create(newMessage);
  }).then(function (message) {
    return Question.findById(message.question_id);
  }).then(function (question) {
    question.answer_count++;
    return question.save();
  }).finally(function () {
    res.json({
      success: 1,
      message: '添加评论成功',
      comment:commentJson
    });
  }).catch(function(err) {
    return console.log('err:', err);
  });
};

exports.delete = function(req, res) {

  Comment.findById(req.params.id).then(function(comment) {
    if(!comment){return Promise.reject('评论不存在');}
    if (comment.author_id.toString() === req.session.user._id.toString()) {
        return comment.remove();
    } else {
      return Promise.reject('没有删除权限');
    }
  }).then(function (comment) {
    return  Question.findByIdAndUpdate(comment.question_id);
  }).then(function (question) {
    question.answer_count=question.answer_count-1;
    return question.save();
  }).then(function (question) {
    res.json({
      success:1,
      message:'删除评论成功'
    });
  }).catch(function (err) {
    if(err instanceof Error){
      console.log('err',err);
      err='服务器出现异常错误';
    }
    res.json({
      success:0,
      message:err
    });
  });
};
