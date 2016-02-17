var User = require('../models/User');
var validator = require('validator');
var Promise = require('bluebird');
var _ = require('lodash');


exports.showReg = function(req, res) {
  res.render('sign/reg', {
    title: '用户注册'
  });
};

exports.reg = function(req, res, next) {
  var newUser = {
    username: req.body.username,
    password: req.body.password
  };
  formValidate(newUser).then(function() { //基本格式验证
    return User.findOne({
      username: newUser.username
    });
  }).then(function(user) { //用户名验证
    if (user) {
      return Promise.reject('该用户名已被注册');
    }
    return User.create(newUser);
  }).then(function(user) {
    return res.json({
      success: 1,
      message: '注册成功'
    });
  }).catch(function(err) {
    if (err instanceof Error) {
      console.log('error:', err);
      err = '服务器出现异常错误，请稍后再试';
    }
    return res.json({
      success: 0,
      message: err
    });
  });
};

exports.showLogin = function(req, res) {
  res.render('sign/login', {
    title: '用户登陆'
  });
};

exports.login = function(req, res) {
  var nowUser = {
    username: req.body.username,
    password: req.body.password
  };
  User.findOne(nowUser).then(function(user) {
    if (user) {
      req.session.user = {
        _id:user._id,
        username:req.body.username
      };
      
      return res.json({
        success: 1,
        message:'登录成功'
      });
    } else {
      return Promise.reject('用户名或密码错误');
    }
  }).catch(function(err) {
    if(err instanceof Error){
       console.log('err:', err);
       err='服务器出现异常，请稍后再试';
    }
    return res.json({
      success: 0,
      message: err
    });
  });
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return console.log('err', err);
    }
    res.json({
      success: 1,
      message:'登出成功'
    });
  });
};


function formValidate(user) {

  _.forEach(user, function(val, key) {
    user[key] = validator.trim(val);
  });

  // 验证信息的正确性
  if ([user.username, user.password].some(function(item) {
      return item === '';
    })) {
    return Promise.reject('信息不完整');
  }
  if (user.username.length < 5) {
    return Promise.reject('用户名至少需要5个字符。');
  }
  if (!(/^[a-zA-Z0-9\-_]+$/i).test(user.username)) {
    return Promise.reject('用户名不合法。');
  }

  return Promise.resolve(true);

}
