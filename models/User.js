var mongoose = require('mongoose');
var db = require('../lib/db');

var UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  authority: {
    type: String,
    default: 'common'
  },
  avatarUrl:{
    type:String,
    default:'/img/avatar-256.png'
  },
  signature:{
    type:String,
    default:'我很懒，没有签名。'
  },
  email:{
    type:String
  },
  website:{
    type:String
  }

});


var User = db.model('User', UserSchema);





module.exports = User;
