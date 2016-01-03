var Article = require('../models/Article');

module.exports={
  getIndex:function (req,res,next) {

    var articleJSON = null;

    Article.find({},null,{
      sort:{
        '_id':-1
      }
    },function(err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      res.render('index', {
        'title': 'MiCo首页',
        'user': req.session.user,
        'articleJSON': docs
      });

    });
  }
};
