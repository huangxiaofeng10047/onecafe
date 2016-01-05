var Question = require('../models/Question');
var Comment = require('../models/Comment');

module.exports = {

  getCreateQuestion:function (req,res,next) {
    var user = {
      username: req.session.user.username
    };
    res.render('question', {
      'title': '发布文章',
      'user': user,
    });
  },
  createQuestion:function (req,res,next) {
    Question.getLastId(function(lastId) {

      var newQuestion = {
        id: lastId + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.session.user.username
      };
      Question.create(newQuestion).then(function(doc) {
        res.json({
          success: 1
        });
      }).catch(function(err) {
        console.log('err:', err);
      });

    });
  },
  getQuestion: function(req, res, next) {

    var userInfo = null;
    var questionJSON = null;
    var commentJSON = null;

    if (req.session.user) {
      userInfo = {
        username: req.session.user.username
      };
    }
    Question.find({
      id: req.params.id
    }, function(err, questionDocs) {
      if (err) {
        console.log(err);
        return;
      }
      Comment.find({
        question: req.params.id
      }, function(err, commentDocs) {
        if (err) {
          console.log(err);
          return;
        }
        res.render('q', {
          'title': '文章',
          'userInfo': userInfo,
          'questionJSON': questionDocs[0],
          'commentJSON': commentDocs
        });
      });
    });
  },
  delQuestion: function(req, res, next) {

    var id = req.params.id;

    Question.find({
      id: id
    }).then(function(docs) {
      if (docs.length && docs[0].author === req.session.user.username) {

        Question.delQuestion(id, function() {
          Comment.delComments(id, function() {

            res.json({
              success: 1
            });

          });
        });

      } else {
        res.json({
          success: 0
        });
      }
    });
  },
  getQuestionList:function (req,res,next) {

    var userInfo={
      username:req.session.user.username
    };

    Question.getQuestionList(userInfo.username,function (docs) {

      res.render('user/question',{
        title:req.params.id,
        userInfo:userInfo,
        questionList:docs
      });

    });
  }


};
