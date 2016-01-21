var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../lib/db');

var MessageSchema = mongoose.Schema({

  author_id: {
    type: String
  },
  master_id: {
    type: String
  },
  question_id: {
    type: String
  },
  comment_id: {
    type: String
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
