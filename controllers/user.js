var User = require('../models/User');
var Question = require('../models/Question');

exports.index = function(req, res) {
    var userInfo;
    User.findOne({
        username: req.params.username
    }).then(function(user) {
        userInfo=user;
        return Question.find({
            author_id: user.id
        });
    }).then(function(questionColl) {
        res.render('user/index', {
            'title': '我的问题',
            'user': userInfo || null,
            'questionCollViewModel': questionColl
        });
    }).catch(function(err) {
        return console.log('err:', err);
    });
};

exports.showSettings=function (req,res) {
  console.log(req.session.user);
  res.render('user/settings',{
    'title': '设置',
    'user':req.session.user || null
  });
};


exports.updateSettings=function (req,res) {

  var info={
    email:req.body.email,
    website:req.body.website,
    signature:req.body.signature
  };

  User.findByIdAndUpdate(req.session.user._id,info).then(function (user) {
    res.redirect('/u/settings');
  });


};
