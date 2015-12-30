var Comment = require('../models/Comment');

module.exports={
  delComment:function (id,callback) {
    return Comment.delComment(id,function () {
      callback();
    });
  }
};
