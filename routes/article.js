var express = require('express');
var router = express.Router();
var filter = require('../lib/filter');
var Article = require('../models/Article');
var async = require('async');

router.get('/article',filter.authorize,function(req, res, next) {

  var userInfo = {
    username: req.session.user.username
  };
  res.render('article', {
    'title': '发布文章',
    'userInfo': userInfo,
  });

});

router.post('/article',filter.authorize,function(req, res, next) {

  async.waterfall([
    function (callback) {

      Article.getLastId(function (lastId) {
        callback(null,lastId);
      });
      
    },function (lastId,callback) {

      var newArticle = {
        id:lastId+1,
        title: req.body.title,
        content: req.body.content,
        author: req.session.user.username
      };

      Article.create(newArticle, function(err, doc) {
        if (err) {
          console.log(err);
          return;
        }
        res.json({
          success: 1
        });
      });
    }

  ]);





});


module.exports = router;
