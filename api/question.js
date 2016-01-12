var Question = require('../models/Question');
var Comment = require('../models/Comment');

module.exports = {

  askQuestion: function(req, res, next) {
    var user = {
      username: req.session.user.username
    };
    res.render('ask', {
      'title': '发布文章',
      'user': user,
    });
  },
  createQuestion: function(req, res, next) {
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

    var user = null;
    if (req.session.user) {
      user = {
        username: req.session.user.username
      };
    }

    var questionJSON = null;
    var commentJSON = [];
    Question.find({
      id: req.params.id
    }).then(function(docs) {
      questionJSON = docs[0];
      return Comment.find({
        question: req.params.id
      });
    }).then(function(docs) {
      commentJSON = docs;
      questionJSON.viewTimes++;
      return questionJSON.save();
    }).then(function() {
      res.render('q', {
        'title': '文章',
        'user': user,
        'questionJSON': questionJSON,
        'commentJSON': commentJSON
      });
    }).catch(function(err) {
      console.log('err:', err);
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
  getQuestionList: function(req, res, next) {

    var user = {
      username: req.session.user.username
    };

    Question.getQuestionList(user.username, function(docs) {

      res.render('user/question', {
        title: req.params.id,
        user: user,
        questionList: docs
      });

    });
  },
editQuestion:function (req,res,next) {

  var user={
    username:req.session.user.username
  };
  Question.find({
    id:req.params.id
  }).then(function (docs) {
    if(docs.length){
      
      res.render('edit',{
        title:'编辑',
        user: user,
        questionJSON:docs[0]
      });

    }
  });

}

};
