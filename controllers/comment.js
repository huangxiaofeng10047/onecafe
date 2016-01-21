var Comment = require('../models/Comment');
var Message = require('../models/Message');

module.exports = {
  createComment: function(req, res, next) {
      var newComment = {
        title: req.body.title,
        content: req.body.content,
        question: req.params.id,
        master: req.body.master,
        author: req.session.user.username
      };

      Comment.create(newComment).then(function(doc) {
        var newMsg = {
          master: req.body.master,
          author: req.session.user.username,
          question_id: req.params.id,
          comment_id: doc._id
        };
        return Message.create(newMsg);
      }).then(function(doc) {
        res.json({
          success: 1,
          message:'添加评论成功'
        });
      }).catch(function(err) {
        return console.log('err:', err);
      });

  },
  delComment: function(req, res, next) {

    var commentId = req.params.commentId;

    Comment.find({
      _id: commentId
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
    var user = {
      username: req.session.user.username
    };

    Comment.getCommentList(req.session.user.username, function(docs) {

      res.render('user/comment', {
        title: req.params.id,
        user: user,
        commentList: docs
      });

    });
  }
};
