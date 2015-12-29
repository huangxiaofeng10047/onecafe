var express = require('express');
var router = express.Router();
var async = require('async');
var filter = require('../lib/filter');


router.get('/u/:id',filter.userAuthorize, function(req, res, next) {
  var userInfo = null;
  if (req.session.signed) {
    userInfo = {
      username: req.session.user.username
    };
  }
   res.render('u',{
     title:req.params.id,
     userInfo:userInfo
   });
});

router.get('/u/:id/article',filter.userAuthorize, function(req, res, next) {
   res.render('user/article',{
     title:req.params.id
   });
});
router.get('/u/:id/comment',filter.userAuthorize, function(req, res, next) {
   res.render('user/comment',{
     title:req.params.id
   });
});



module.exports = router;
