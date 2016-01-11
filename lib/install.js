var Global = require('../models/Global');
var globalJSON = require('../lib/json').global;

module.exports = function() {

  //初始化数据库集合
  Global.findOne({
    name:'admin'
  },function(err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    if (!docs) {
      new Global(globalJSON).save();
    }
  });




};
