var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var reg = require('./reg');
var login = require('./login');
var logout = require('./logout');
var article = require('./article');
var a = require('./a');
var u = require('./u');
var uarticle = require('./user/article');
var ucomment = require('./user/comment');

router.get('/', function(req, res, next) {

  var userInfo = null;
  var articleJSON = null;

  if (req.session.user) {
    userInfo = {
      username: req.session.user.username
    };
  }


  Article.find({}, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
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
router.use(a);
router.use(u);
router.use(uarticle);
router.use(ucomment);






module.exports = router;
