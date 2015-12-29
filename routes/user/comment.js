var express = require('express');
var router = express.Router();
var filter = require('../../lib/filter');
var Comment = require('../../models/Comment');

router.get('/u/:id/comment',filter.authorize,filter.userAuthorize, function(req, res, next) {

    var userInfo={
      username:req.session.user.username
    };

    Comment.getCommentList(req.session.user.username,function (docs) {

      res.render('user/comment',{
        title:req.params.id,
        userInfo:userInfo,
        commentList:docs
      });
    });

});

module.exports=router;
