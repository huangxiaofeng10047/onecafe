var express = require('express');
var router = express.Router();
var Article = require('../models/Article');

router.get('/article', function(req, res, next) {


  var userInfo = null;
  if (req.session.signed) {

    userInfo = {
      username: req.session.user.username
    };
    res.render('article', {
      'title': '发布文章',
      'userInfo':userInfo,
      'headeChange':true
    });



  }else{
    res.redirect('/login');
  }

});

router.post('/article',function (req,res,next) {

  if(req.session.signed){
    var newArticle={
      title:req.body.title,
      content:req.body.content,
      author:req.session.user.username
    };
    Article.create(newArticle,function (err,doc) {
      if(err){
        console.log(err);
        return;
      }
      res.json({
        success:1
      });
    });


  }else{
    res.redirect('/login');
  }

});


module.exports=router;
