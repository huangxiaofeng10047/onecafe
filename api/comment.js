var Comment = require('../models/Comment');

module.exports = {
  createComment: function(req, res, next) {

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
  },
  delComment: function(req, res, next) {

    var commentId = req.params.commentId;

    Comment.find({
      id: commentId
    }).then(function(docs) {
      if (docs.length && docs[0].author === req.session.user.username) {
        Comment.delComment(commentId, function() {
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
  },
  getCommentList: function(req, res, next) {
    var userInfo = {
      username: req.session.user.username
    };

    Comment.getCommentList(req.session.user.username, function(docs) {

      res.render('user/comment', {
        title: req.params.id,
        userInfo: userInfo,
        commentList: docs
      });

    });
  }
};
