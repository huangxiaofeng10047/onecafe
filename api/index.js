var Question = require('../models/Question');

module.exports={
  getIndex:function (req,res,next) {

    var questionJSON = null;

    Question.find({},null,{
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
        'questionJSON': docs
      });

    });
  }
};
