var express = require('express');
var router = express.Router();
var async = require('async');
var Article = require('../models/Article');
var filter = require('../lib/filter');
var Comment = require('../models/Comment');
var article = require('../api/article');
var comment = require('../api/comment');

router.get('/a/:id', filter.articleAuthorize, function(req, res, next) {

  var userInfo = null;
  var articleJSON = null;
  var commentJSON = null;

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
      article: req.params.id
    }, function(err, commentDocs) {
      if (err) {
        console.log(err);
        return;
      }
      res.render('a', {
        'title': '文章',
        'userInfo': userInfo,
        'articleJSON': articleDocs[0],
        'commentJSON': commentDocs
      });
    });
  });
});

router.post('/a/:id', filter.authorizePOST, filter.articleAuthorize, function(req, res, next) {

  Comment.getLastId(function(lastId) {

    var newComment = {
      id: lastId + 1,
      title: req.body.title,
      content: req.body.content,
      article: req.params.id,
      author: req.session.user.username
    };
    Comment.create(newComment).then(function(doc) {
      res.json({
        success: 1
      });
    }).catch(function(err) {
      console.log('err:', err);
    });

  });


});

router.delete('/a/:id', filter.authorizePOST, filter.articleAuthorize, function(req, res, next) {

  var id = req.params.id;

  Article.find({
    id: id
  }).then(function(docs) {
    if (docs.length && docs[0].author === req.session.user.username) {
      article.delArticle(id, function() {
        res.json({
          success: 1
        });
      });
    } else {
      res.json({
        success: 0
      });
    }
  });


});

router.delete('/a/:id/:commentId', filter.authorizePOST, filter.articleAuthorize, function(req, res, next) {

  var id = req.params.commentId;

  Comment.find({
    id: id
  }).then(function(docs) {
    if (docs.length && docs[0].author === req.session.user.username) {
      comment.delComment(id, function() {
        res.json({
          success: 1
        });
      });
    } else {
      res.json({
        success: 0
      });
    }
  });


});



module.exports = router;
