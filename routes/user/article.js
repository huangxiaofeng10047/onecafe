var express = require('express');
var router = express.Router();
var filter = require('../../lib/filter');

router.get('/u/:id/article',filter.userAuthorize, function(req, res, next) {
   res.render('user/article',{
     title:req.params.id
   });
});

module.exports=router;
