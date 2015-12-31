var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/login', function(req, res, next) {
  res.render('login', {
    title: '用户登陆'
  });
});

router.post('/login', function(req, res, next) {

var user = {
  username: req.body.username,
  password: req.body.password
};

// 查找用户并赋予登录权限
if (User.find(user, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (!doc.length) {
      res.json({
        success:0
      });
      return;
    }

    // 添加到session
    req.session.user = user;

    res.json({
      success:1
    });

  }));


});


module.exports = router;
