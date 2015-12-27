var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var reg = require('./reg');
var login = require('./login');
var logout = require('./logout');
var article = require('./article');

router.get('/', function(req, res, next) {

  var userInfo = null;
  var articleJSON = null;
  if (req.session.signed) {
    userInfo = {
      username: req.session.user.username
    };

  }

  Article.find({}, function(err, docs) {
    res.render('index', {
      'title': 'MiCo首页',
      'userInfo': userInfo,
      'articleJSON': docs
    });
  });


});

router.use(reg);
router.use(login);
router.use(logout);
router.use(article);






/* GET article page. */
router.get('/article', function(req, res, next) {

  Article.find({}, function(err, doc) {

    if (err) {
      console.log(err);
      return;
    }


    res.render('article', {
      title: 'article',
      articleJSON: doc
    });
  });

});

/* POST article page. */
router.post('/article', function(req, res, next) {

  if (!req.session.user) {
    res.redirect('/article');
  }

  var article = {
    author: req.session.user.username,
    title: req.body.title,
    content: req.body.content
  };

  Article.create(article, function(err, doc) {

    res.redirect('/article');

  });


});


module.exports = router;
