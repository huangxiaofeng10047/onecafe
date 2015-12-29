var express = require('express');
var router = express.Router();
var filter = require('../../lib/filter');

router.get('/u/:id/comment',filter.userAuthorize, function(req, res, next) {
   res.render('user/comment',{
     title:req.params.id
   });
});

module.exports=router;
