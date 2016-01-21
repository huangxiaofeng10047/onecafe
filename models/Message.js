var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../lib/db');
var ObjectId=mongoose.Schema.Types.ObjectId;

var MessageSchema = mongoose.Schema({

  author_id: {
    type: ObjectId
  },
  master_id: {
    type: ObjectId
  },
  question_id: {
    type: ObjectId
  },
  comment_id: {
    type: ObjectId
  },
  has_read: {
    type: Boolean,
    default: false
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});


MessageSchema.static('getMessages', function(username, callback) {

  return this.find({
    master: username
  }, function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    callback(docs);
  });

});



var Message = db.model('Message', MessageSchema);

module.exports = Message;
