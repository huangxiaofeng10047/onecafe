var express = require('express');
var router = express.Router();
var async = require('async');
var Article = require('../models/Article');
var filter = require('../lib/filter');
var Comment = require('../models/Comment');

router.get('/a/:id', filter.articleAuthorize, function(req, res, next) {

  var userInfo = null;
  var articleJSON = null;
  var commentJSON=null;

  if (req.session.user) {
    userInfo = {
      username: req.session.user.username
    };
  }

  Article.find({
    id: req.params.id
  }, function(err, articleDocs) {
    if (err) {
      console.log(err);
      return;
    }
    Comment.find({
      article:req.params.id
    },function (err,commentDocs) {
      if(err){console.log(err);return;}
      res.render('a', {
        'title': '文章',
        'userInfo': userInfo,
        'articleJSON': articleDocs[0],
        'commentJSON':commentDocs
      });
    });
  });
});

router.post('/a/:id', filter.authorizePOST, function(req, res, next) {

  async.waterfall([
    function(callback) {

      Comment.getLastId(function(lastId) {
        callback(null, lastId);
      });

    },
    function(lastId, callback) {

      var newComment = {
        id: lastId + 1,
        content: req.body.content,
        article: req.params.id,
        author: req.session.user.username
      };

      Comment.create(newComment, function(err, doc) {
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
