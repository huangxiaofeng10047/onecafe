var Article = require('../models/Article');
var User = require('../models/User');

exports.authorize = function(req, res, next) {
  if (!req.session.signed) {
    res.redirect('/login');
  } else {
    next();
  }
};
exports.authorizePOST = function(req, res, next) {
  if (!req.session.signed) {
    res.json({
      success:0
    });
  } else {
    next();
  }
};
exports.articleAuthorize = function(req, res, next) {

  var articleId=req.params.id;
  Article.find({
    id:articleId
  },function (err,doc) {
    if(doc){
      next();
    }else{
      res.render('404',{
        title:'404'
      });
    }
  });

};


exports.userAuthorize = function(req, res, next) {

  var username=req.params.id;
  User.find({
    username:username
  },function (err,doc) {
    if(doc){
      next();
    }else{
      res.render('404',{
        title:'404'
      });
    }
  });

};
