var Comment = require('../models/Comment');


exports.create = function(req, res) {
  var newComment = {
    title: req.body.title,
    content: req.body.content,
    question_id: req.body.question_id,
    author_id: req.session.user._id
  };
  Comment.create(newComment).then(function(comment) {
    res.json({
      success: 1,
      message: '添加评论成功'
    });
  }).catch(function(err) {
    return console.log('err:', err);
  });
};

exports.delete = function(req, res) {
  Comment.findById(req.params.id).then(function(comment) {

    if(!comment){return Promise.reject('评论不存在');}
    if (comment.author_id.toString() === req.session.user._id.toString()) {
      comment.remove();
      res.json({
        success:1,
        message:'删除评论成功'
      });
    } else {
      res.json({
        success: 0,
        message:'没有删除权限'
      });
    }
  }).catch(function (err) {
    if(err instanceof Error){
      console.log('err',err);
      err='服务器出现异常错误';
    }
    res.json({
      success:0,
      message:err
    });
  });
};
