var mongoose = require('mongoose');
mongoose.Promise=require('bluebird');
var db = require('../lib/db');
var ObjectId=mongoose.Schema.Types.ObjectId;

var MessageSchema = mongoose.Schema({

  has_read:{
    type:Boolean,
    default:false
  },
  create_at:{
    type:Date,
    default: Date.now
  },
  question_id:{
    type:ObjectId
  },
  author_id: {
    type: ObjectId
  },
  reply_to_id:{
    type:ObjectId
  }
});




var Message = db.model('Message', MessageSchema);

module.exports = Message;
