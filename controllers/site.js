var Question = require('../models/Question');
var User = require('../models/User');
var Promise = require('bluebird');
var Message = require('../models/Message');
var Comment = require('../models/Comment');
var _ = require('lodash');


exports.showIndex = function(req, res) {


    // 用户登录状态检查是否有消息未读
    var queryMessageColl;
    if (req.session.user) {
        queryMessageColl = Message.find({
            reply_to_id: req.session.user._id,
            has_read: false
        }).then(function(messageColl) {
            return messageColl;
        }).map(function(message) {
            return User.findById(message.author_id).then(function(user) {
                message = _.clone(message);
                message.author = user.username;
                return message;
            });
        }).map(function(message) {
            return Question.findById(message.question_id).then(function(question) {
                message.question = question.title;
                return message;
            });
        }).then(function(messageColl) {
            var viewModel = _.map(messageColl, function(val) {
                return {
                    author: val.author,
                    question: val.question,
                    question_id: val.question_id
                };
            });
            req.session.user.message = viewModel;
            return Promise.resolve(viewModel);
        });
    } else {
        queryMessageColl = new Promise(function(resolve, reject) {
            resolve();
        });
    }

    var type = req.query.question;
    var query={};
        sort=null;
    if (type == 'hottest') {
      sort={
        'visit_count':-1,
          '_id': -1
      };
    } else if (type == 'unanswered') {
      query={
        answer_count:0
      };
      sort={
          '_id': -1
      };
    } else {
      sort={
          '_id': -1
      };
    }

  var  queryQuestionColl = Question.find(query, null,sort).then(function(questionColl) {
        return questionColl;
    }).map(function(question) {
        return User.findById(question.author_id).then(function(user) {
            question.author = user.username;
            question.avatarUrl = user.avatarUrl;
            return question;
        });
    });




    Promise.resolve([queryQuestionColl, queryMessageColl]).spread(function(questionColl, messageColl) {

        res.render('index', {
            'title': 'OneCafe',
            'type':type,
            'questionColl': questionColl,
            'user': req.session.user || null
        });
    }).catch(function(err) {
        return console.log('err:', err);
    });
};

exports.upload = function(req, res) {
    var filename = '/uploads/' + req.file.filename;
    User.findById(req.session.user._id).then(function(user) {
        user.avatarUrl = filename;
        return user.save();
    }).then(function(user) {
        res.json({
            success: true,
            path: user.avatarUrl
        });
    });

};
