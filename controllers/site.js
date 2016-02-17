var Question = require('../models/Question');
var User = require('../models/User');
var Promise = require('bluebird');
var Message = require('../models/Message');
var _ = require('lodash');


exports.showIndex = function(req, res) {

// 用户登录状态检查是否有消息未读
  var queryMessageColl;
  if(req.session.user){
     queryMessageColl=Message.find({
      reply_to_id:req.session.user._id,
      has_read:false
    }).then(function (messageColl) {
      return messageColl;
    }).map(function (message) {
      return User.findById(message.author_id).then(function (user) {
        message.author=user.username;
        return message;
      });
    }).map(function (message) {
      console.log(message);
      return Question.findById(message.question_id).then(function (question) {
        message.question=question.title;
        return message;
      });
    }).then(function (messageColl) {
      req.session.user.message=messageColl;
      return Promise.resolve(messageColl);
    });
  }else{
    return Promise.resolve(null);
  }

  var queryQuestionColl = Question.find({}, null, {
    sort: {
      '_id': -1
    }
  }).then(function(questionColl) {
    return questionColl;
  }).map(function(question) {
    return User.findById(question.author_id).then(function(user) {
      question.author = user.username;
      return question;
    });
  });


  Promise.resolve([queryQuestionColl,queryMessageColl]).spread(function(questionColl,messageColl) {


    res.render('index', {
      'title': 'MiCo首页',
      'questionColl': questionColl,
      'user': req.session.user
    });
  }).catch(function(err) {
    return console.log('err:', err);
  });
};
