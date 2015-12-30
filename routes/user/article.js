var express = require('express');
var router = express.Router();
var filter = require('../../lib/filter');
var User = require('../../api/User');
router.get('/u/:id/article',filter.authorize,filter.userAuthorize, function(req, res, next) {

    var userInfo={
      username:req.session.user.username
    };

    var user=new User(req.session.user.username);
    user.getArticleList(function (docs) {

      res.render('user/article',{
        title:req.params.id,
        userInfo:userInfo,
        articleList:docs
      });

    });



});

module.exports=router;
