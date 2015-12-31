var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/admin',function (req,res,next) {

  res.render('admin/index',{
    title:'index',
    userInfo:req.session.user || null
  });

});

router.get('/admin/login',function (req,res,next) {

  res.render('admin/login',{
    title:'login'
  });

});

router.post('/admin/login',function (req,res,next) {

  User.find({
    username:req.body.username
  },function (err,docs) {
    if(err){console.log(err);return;}
    if(docs.length && docs[0].authority === 'admin'){
      req.session.user={
        username:req.body.username
      };
      res.json({
        success:1
      });

    }else {
      res.json({
        success:0
      });
    }

  });

});

router.get('/admin/logout',function (req,res,next) {

  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      success: 1
    });
  });

});


module.exports=router;
