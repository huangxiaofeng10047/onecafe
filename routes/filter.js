var Question = require('../models/Question');
var User = require('../models/User');

exports.authorize = function(req, res, next) {
  if (!req.session.user) {
    if (req.xhr) {
      res.json({
        success: 0
      });
    } else {
      res.redirect('/login');
    }
  } else {
    next();
  }
};

exports.questionAuthorize = function(req, res, next) {


  var questionId = req.params.id;
  Question.find({
    _id: questionId
  }, function(err, doc) {
    if (doc.length) {
      next();
    } else {
      res.render('404', {
        title: '404'
      });
    }
  });

};
exports.userAuthorize = function(req, res, next) {

  var username = req.params.id;

  if (username === req.session.user.username) {
    next();
  } else {
    res.render('404', {
      title: '404'
    });
  }

};
