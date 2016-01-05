var User = require('../models/User');

module.exports = {

  getReg: function(req, res, next) {
    //登陆状态下回到主页
    if (req.session.user) {
      res.redirect('/');
    }

    res.render('reg', {
      title: '用户注册'
    });
  },
  postReg: function(req, res, next) {
    //登陆状态下回到主页
    if (req.session.user) {
      res.redirect('/');
    }

    var user = {
      username: req.body.username,
      password: req.body.password,
      authority: 'common'
    };
    // 添加新用户
    User.create(user, function(err, doc) {
      if (err) {
        console.log(err);
        res.json({
          success: 0
        });
      }
      res.json({
        success: 1
      });
    });

  },
  getLogin: function(req, res, next) {
    res.render('login', {
      title: '用户登陆'
    });
  },
  postLogin: function(req, res, next) {
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
            success: 0
          });
          return;
        }

        // 添加到session
        req.session.user = user;

        res.json({
          success: 1
        });

      }));
  },
  getLogout: function(req, res, next) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        success: 1
      });
    });

  },
  getAdmin: function(req, res, next) {
    res.render('admin/index', {
      title: 'index',
      userInfo: req.session.user || null
    });
  },
  getAdminLogin: function(req, res, next) {
    res.render('admin/login', {
      title: 'login'
    });
  },
  postAdminLogin: function(req, res, next) {
    User.find({
      username: req.body.username
    }, function(err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      if (docs.length && docs[0].authority === 'admin') {
        req.session.user = {
          username: req.body.username
        };
        res.json({
          success: 1
        });

      } else {
        res.json({
          success: 0
        });
      }

    });
  },
  getAdminLogout: function(req, res, next) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        success: 1
      });
    });
  },
  getUserHome: function(req, res, next) {

    var user = {
      username: req.session.user.username
    };
    res.render('user/u', {
      title: req.params.id,
      user: req.params.id === user.username ? user : null
    });
  }

};
