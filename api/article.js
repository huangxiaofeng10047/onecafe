var Article = require('../models/Article');
var Comment = require('../models/Comment');

module.exports={

  delArticle:function (id,callback) {
    return Article.delArticle(id,function () {
      return Comment.delComments(id,function () {
        callback();
      });
    });
  }


};
