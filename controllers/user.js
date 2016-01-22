var User = require('../models/User');

module.exports = {

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

    res.render('user/index', {
      title: req.params.id,
      username: req.session.username === req.params.id  ? req.session.username : null
    });
  }

};
