var User = require('../models/User');
var Question = require('../models/Question');

exports.index=function (req,res) {

  res.render('user',{
    title:'主页',
    user:req.session.user || null
  });
};

exports.showQuestionColl=function (req,res) {

  Question.find({
    author_id:req.session.user._id
  }).then(function (questionColl) {
    res.render('user/question-list',{
      'title':'我的问题',
      'user':req.session.user || null,
      'questionCollViewModel':questionColl
    });
  });

};

exports.showMessages=function (req,res) {
  console.log(req.session.user.message[0].author);
  res.render('user/messages',{
    'title':'消息',
    'user':req.session.user || null
  })
};
