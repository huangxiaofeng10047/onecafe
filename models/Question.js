var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../lib/db');
var moment = require('moment');

var QuestionSchema = mongoose.Schema({

  title: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  post_at: {
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
  return moment(this.post_at).format('x');
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
    _id: id
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
