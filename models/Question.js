var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../lib/db');
var moment = require('moment');

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
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  viewTimes:{
    type:Number,
    default:0
  }
});

//格式化时间
QuestionSchema.virtual('createdDate').get(function () {
  return moment(this.postDate).format('x');
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
QuestionSchema.static('getQuestionList', function(username, callback) {

  return this.find({
    author: username
  }, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    callback(docs);
  });

});

// 删除文章
QuestionSchema.static('delQuestion', function(id, callback) {

  return this.findOneAndRemove({
    id: id
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
