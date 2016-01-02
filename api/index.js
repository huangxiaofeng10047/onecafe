var Article = require('../models/Article');

module.exports={
  getIndex:function (req,res,next) {
    var userInfo = null;
    var articleJSON = null;

    if (req.session.user) {
      userInfo = {
        username: req.session.user.username
      };
    }


    Article.find({}, function(err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      res.render('index', {
        'title': 'MiCo首页',
        'userInfo': userInfo,
        'articleJSON': docs

      });

    });
  }
};
