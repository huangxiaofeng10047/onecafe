var User = require('../models/User');
var Question = require('../models/Question');

exports.index = function(req, res) {
    User.findOne({
        username: req.params.id
    }).then(function(user) {
        return Question.find({
            author_id: user.id
        });
    }).then(function(questionColl) {
        res.render('user/index', {
            'title': '我的问题',
            'user': req.session.user || null,
            'questionCollViewModel': questionColl
        });
    }).catch(function(err) {
        return console.log('err:', err);
    });
};

exports.showSettings=function (req,res) {
  res.render('user/settings',{
    'title': '设置'
  });
};
