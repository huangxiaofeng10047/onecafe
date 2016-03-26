var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../lib/db');
var moment = require('moment');
var ObjectId=mongoose.Schema.Types.ObjectId;


var QuestionSchema = mongoose.Schema({

  title: {
    type: String
  },
  content: {
    type: String
  },
  author_id: {
    type: ObjectId
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at:{
    type: Date,
    default: Date.now
  },
  visit_count:{
    type:Number,
    default:0
  }
});

//格式化时间
QuestionSchema.virtual('create_time').get(function () {
  return moment(this.create_at).format('x');
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



var Question = db.model('Question', QuestionSchema);

module.exports = Question;
