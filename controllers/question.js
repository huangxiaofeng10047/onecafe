var Promise = require('bluebird');
var Question = require('../models/Question');
var User = require('../models/User');
var Comment = require('../models/Comment');
var Message = require('../models/Message');


exports.showCreate = function(req, res) {
    res.render('question/create', {
      'title': '提问',
      'user': req.session.user
    });
};

exports.create = function(req, res) {

  var newQuestion = {
    title: req.body.title,
    content: req.body.content,
    author_id: req.session.user._id
  };
  Question.create(newQuestion).then(function(question) {
    return res.json({
      success: 1
    });
  }).catch(function(err) {
    return console.log('err:', err);
  });
};

exports.index = function(req, res) {


  var questionViewModel = null;
  Question.findById(req.params.id).then(function(question) {
    if (question) {
      questionViewModel = question;
      return User.findById(question.author_id);
    } else {
      return Promise.reject('此话题不存在');
    }
  }).then(function(user) {
    questionViewModel.author = user.username;
    return Comment.find({
      question_id: req.params.id
    });
  }).map(function(comment) {
    return User.findById(comment.author_id).then(function (user) {
      comment.author=user.username;
      return comment;
    });
  }).then(function (commentCollViewModel) {
    res.render('question/index', {
      'title': '问题',
      'user': req.session.user || null,
      'question': questionViewModel,
      'commentColl': commentCollViewModel
    });
  }).catch(function(err) {
    if (err instanceof Error) {
      console.log('err', err);
      err = '服务器出现异常错误 ';
    }
    return res.json({
      success: 0,
      message: err
    });
  });
};

exports.showUpdate = function(req, res) {
  Question.findById(req.params.id).then(function(question) {
    if (question) {
      return res.render('question/update', {
        'title': '编辑',
        'question': question,
        'user': req.session.user
      });
    } else {
      return Promise.reject('页面不存在');
    }
  }).catch(function(err) {
    if (err instanceof Error) {
      console.log('err', err);
    }
    return res.render('404', {
      'title': '页面不存在'
    });
  });
};

exports.update = function(req, res) {
  var newQuestion = {
    title: req.body.title,
    content: req.body.content,
    update_at: new Date()
  };
  Question.findByIdAndUpdate(req.params.id, newQuestion).then(function(question) {
    return res.json({
      success: 1
    });
  }).catch(function(err) {
    console.log('err', err);
    return res.json({
      success: 0,
      message: '更新失败，出现异常错误'
    });
  });
};

exports.delete = function(req, res) {

  Question.findById(req.params.id).then(function(question) {
    if(question){
      if (question.author_id.toString() === req.session.user._id.toString()) {
        question.remove();
        return Promise.resolve(question);
      } else {
        return Promise.reject('没有删除权限');
      }
    }else{
      return Promise.reject('问题不存在');
    }
  }).then(function (question) {
      return Comment.remove({
        question_id:question._id
      });
  }).then(function (commentColl) {
    return res.json({
      success:1,
      message:'删除问题成功'
    });
  }).catch(function (err) {
    if(err instanceof Error){
      console.log('err',err);
      err='服务器出现异常错误';
    }
    return res.json({
      success:0,
      err:err
    });
  });

};
