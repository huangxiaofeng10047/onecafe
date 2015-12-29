var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var reg = require('./reg');
var login = require('./login');
var logout = require('./logout');
var article = require('./article');
var a = require('./a');

router.get('/', function(req, res, next) {

  var userInfo = null;
  var articleJSON = null;

  if (req.session.signed) {
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






module.exports = router;
