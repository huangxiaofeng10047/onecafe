var Question = require('../models/Question');
var Comment = require('../models/Comment');

module.exports = {

  askQuestion: function(req, res, next) {

    var username = req.session.username;
    res.render('question/ask', {
      'title': '发布文章',
      'username': username
    });
  },
  createQuestion: function(req, res, next) {

    var newQuestion = {
      title: req.body.title,
      content: req.body.content,
      author: req.session.username
    };
    Question.create(newQuestion).then(function(doc) {
      res.json({
        success: 1
      });
    }).catch(function(err) {
      console.log('err:', err);
    });

  },
  getQuestion: function(req, res, next) {

    var username = null;
    if (req.session.username) {
      username = req.session.username;
    }

    var questionJSON = null;
    var commentJSON = [];
    Question.find({
      _id: req.params.id
    }).then(function(docs) {
      questionJSON = docs[0];
      return Comment.find({
        question_id: req.params.id
      });
    }).then(function(docs) {
      commentJSON = docs;
      questionJSON.viewTimes++;
      return questionJSON.save();
    }).then(function() {
      res.render('question/index', {
        'title': '文章',
        'username': username,
        'questionJSON': questionJSON,
        'commentJSON': commentJSON
      });
    }).catch(function(err) {
      console.log('err:', err);
    });

  },
  delQuestion: function(req, res, next) {

    var id = req.params.id;

    Question.findOne({
      _id: id
    }).then(function(doc) {
      if (doc.author === req.session.username) {
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

    var username = req.session.username;

    Question.getQuestionList(username, function(docs) {

      res.render('user/question-list', {
        title: req.params.id,
        username: username,
        questionList: docs
      });

    });
  },
  editQuestion: function(req, res, next) {

      var username= req.session.username;
    Question.find({
      _id: req.params.id
    }).then(function(docs) {
      if (docs.length) {

        res.render('question/edit', {
          title: '编辑',
          username: username,
          questionJSON: docs[0]
        });

      }
    });

  },
  updateQuestion: function(req, res, next) {

    var newQuestion = {
      title: req.body.title,
      content: req.body.content
    };

    Question.findOneAndUpdate({
      _id: req.params.id
    }, newQuestion).then(function(doc) {

      res.json({
        success: 1
      });
    }).catch(function(err) {
      res.json({
        success: 0
      });
      return console.log('err:', err);
    });
  }

};
