var Question = require('../models/Question');
var User = require('../models/User');
var Promise = require('bluebird');
var _ = require('lodash');


exports.showIndex = function(req, res) {

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


  Promise.resolve([queryQuestionColl]).spread(function(questionColl) {
    res.render('index', {
      'title': 'MiCo首页',
      'questionColl': questionColl,
      'user': req.session.user
    });
  }).catch(function(err) {
    return console.log('err:', err);
  });
};
