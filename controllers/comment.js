var Comment = require('../models/Comment');
var Message = require('../models/Message');

module.exports = {
  createComment: function(req, res, next) {
      var newComment = {
        title: req.body.title,
        content: req.body.content,
        question_id: req.params.id,
        author: req.session.username
      };

      Comment.create(newComment).then(function(doc) {
        var newMsg = {
          master: req.body.master,
          author: req.session.username,
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

    Comment.findOne({
      _id: commentId
    }).then(function(doc) {
      if (doc.author === req.session.username) {
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
      var username=req.session.username;

    Comment.getCommentList(username, function(docs) {

      res.render('user/comment-list', {
        title: req.params.id,
        username:username,
        commentList: docs
      });

    });
  }
};
