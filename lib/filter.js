var Article = require('../models/Article');

exports.authorize = function(req, res, next) {
  if (!req.session.signed) {
    res.redirect('/login');
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
