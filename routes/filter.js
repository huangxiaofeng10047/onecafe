var User = require('../models/User');

exports.authorize = function(req, res, next) {
  if (!req.session.user) {
    if (req.xhr) {
      res.json({
        success: 0,
        message:'用户未登录'
      });
    } else {
      res.redirect('/login');
    }
  } else {
    next();
  }
};
