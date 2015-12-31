var express = require('express');
var router = express.Router();
var filter = require('../lib/filter');
var Article = require('../models/Article');

router.get('/article', filter.authorize, function(req, res, next) {

  var userInfo = {
    username: req.session.user.username
  };
  res.render('article', {
    'title': '发布文章',
    'userInfo': userInfo,
  });

});

router.post('/article', filter.authorize, function(req, res, next) {

  Article.getLastId(function(lastId) {

    var newArticle = {
      id: lastId + 1,
      title: req.body.title,
      content: req.body.content,
      author: req.session.user.username
    };
    Article.create(newArticle).then(function(doc) {
      res.json({
        success: 1
      });
    }).catch(function(err) {
      console.log('err:', err);
    });

  });

});


module.exports = router;
