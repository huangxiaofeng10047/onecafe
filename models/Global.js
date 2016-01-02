var mongoose = require('mongoose');
var db = require('../lib/db');

var GlobalSchema = mongoose.Schema({
  _id: {
    type: String
  },
  domain: {
    type: String
  },
  title: {
    type: String
  }
});


var Global = db.model('Global', GlobalSchema);


module.exports = Global;
