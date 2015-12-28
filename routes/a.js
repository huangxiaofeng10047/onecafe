var express = require('express');
var router = express.Router();
var filter = require('../lib/filter');
var Article = require('../models/Article');

router.get('/a/:id',filter.articleAuthorize,function(req, res, next) {


  var userInfo = null;
  var articleJSON = null;

  if (req.session.signed) {
    userInfo = {
      username: req.session.user.username
    };
  }

  Article.find({
    id:req.params.id
  }, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    res.render('a', {
      'title': '文章',
      'userInfo': userInfo,
      'articleJSON': docs[0]
    });

  });


});


module.exports = router;
