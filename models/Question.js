var mongoose = require('mongoose');
mongoose.Promise=require('bluebird');
var db = require('../lib/db');

var QuestionSchema = mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  }
});

//实现id自增
QuestionSchema.static('getLastId', function(callback) {

  return this.find({}, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    if (!docs.length) {
      callback(0);
      return;
    }
    callback(docs[docs.length - 1].id);
  });

});

// 获取用户文章列表
QuestionSchema.static('getQuestionList', function(username,callback) {

  return this.find({
    author:username
  }, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    callback(docs);
  });

});

// 删除文章
QuestionSchema.static('delQuestion', function(id,callback) {

  return this.findOneAndRemove({
    id:id
  }, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    callback();
  });

});

var Question = db.model('Question', QuestionSchema);

module.exports = Question;
