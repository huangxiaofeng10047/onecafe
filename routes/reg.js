var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/reg', function(req, res, next) {
  //登陆状态下回到主页
  if(req.session.user){
    res.redirect('/');
  }

  res.render('reg', {
    title: '用户注册'
  });
});

router.post('/reg', function(req, res, next) {
  //登陆状态下回到主页
  if(req.session.user){
    res.redirect('/');
  }

  var user = {
    username: req.body.username,
    password: req.body.password,
    authority:'common'
  };
  // 添加新用户
  User.create(user, function(err, doc) {
    if (err) {
      console.log(err);
      res.json({
        success:0
      });
    }
    res.json({
      success:1
    });
  });


});
module.exports = router;
