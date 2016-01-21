var User = require('../models/User');



exports.showReg = function(req, res) {
  res.render('sign/reg', {
    title: '用户注册'
  });
};
exports.reg = function(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password,
    authority: 'common'
  };

  User.findOne({//查找用户名是否已存在
    username: req.body.username
  }).then(function(doc) {
    if (doc) {//如果用户已存在
      return res.json({
        success: 0,
        message: '该用户名已被注册'
      });
    } else {//如果用户不存在
       User.create(user).then(function (doc) {//创建新用户
         res.json({
           success: 1,
           message: '注册成功'
         });
       }).catch(function (err) {
         return console.log('err', err);
       });
    }
  }).catch(function(err) {
    return console.log('err', err);
  });
};



exports.showLogin = function(req, res) {
  res.render('sign/login', {
    title: '用户登陆'
  });
};
exports.login = function(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password
  };

  // 查找用户并创建session
  User.findOne(user).then(function(doc) {
    if (doc) {
      // 添加到session
      req.session.user = user;
      res.json({
        success: 1
      });
    } else {
      res.json({
        success: 0,
        message: '用户名或密码错误'
      });
    }
  }).catch(function(err) {
    res.json({
      success: 0,
      message: '服务器出现异常错误'
    });
    return console.log('err:', err);
  });


};



exports.logout = function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      return console.log('err', err);
    }
    res.json({
      success: 1
    });
  });
};
