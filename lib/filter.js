exports.authorize = function(req, res, next) {
  if (!req.session.signed) {
    res.redirect('/login');
  } else {
    next();
  }
};
