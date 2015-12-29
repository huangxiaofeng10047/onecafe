var express = require('express');
var router = express.Router();
var async = require('async');
var filter = require('../lib/filter');


router.get('/u/:id',filter.userAuthorize, function(req, res, next) {
  var userInfo = null;
  if (req.session.user) {
    userInfo = {
      username: req.session.user.username
    };
  }
   res.render('u',{
     title:req.params.id,
     userInfo:userInfo
   });
});






module.exports = router;
