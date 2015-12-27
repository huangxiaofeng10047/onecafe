var mongoose = require('mongoose');
var db = require('./db');

var UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});



var User = db.model('User',UserSchema);

module.exports = User;
