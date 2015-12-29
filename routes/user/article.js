var express = require('express');
var router = express.Router();
var filter = require('../../lib/filter');
var Article = require('../../models/Article');

router.get('/u/:id/article',filter.authorize,filter.userAuthorize, function(req, res, next) {

    var userInfo={
      username:req.session.user.username
    };

    Article.getArticleList(req.session.user.username,function (docs) {

      res.render('user/article',{
        title:req.params.id,
        userInfo:userInfo,
        articleList:docs
      });
    });

});

module.exports=router;
