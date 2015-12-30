var Article = require('../models/Article');

function User(username) {
  this.username=username;
}

User.prototype.getArticleList = function (callback) {
  return Article.getArticleList(this.username,function (docs) {
      callback(docs);
  });
};

module.exports=User;
