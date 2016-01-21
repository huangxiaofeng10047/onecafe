var mongoose = require('mongoose');
var db = require('../lib/db');

var GlobalSchema = mongoose.Schema({
  
  domain: {
    type: String
  },
  title: {
    type: String
  }
});


var Global = db.model('Global', GlobalSchema);


module.exports = Global;
