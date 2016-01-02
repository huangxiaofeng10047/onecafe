var Article = require('../models/Article');
var Comment = require('../models/Comment');

module.exports = {

  getCreateArticle:function (req,res,next) {
    var userInfo = {
      username: req.session.user.username
    };
    res.render('article', {
      'title': '发布文章',
      'userInfo': userInfo,
    });
  },
  createArticle:function (req,res,next) {
    Article.getLastId(function(lastId) {

      var newArticle = {
        id: lastId + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.session.user.username
      };
      Article.create(newArticle).then(function(doc) {
        res.json({
          success: 1
        });
      }).catch(function(err) {
        console.log('err:', err);
      });

    });
  },
  getArticle: function(req, res, next) {

    var userInfo = null;
    var articleJSON = null;
    var commentJSON = null;

    if (req.session.user) {
      userInfo = {
        username: req.session.user.username
      };
    }
    Article.find({
      id: req.params.id
    }, function(err, articleDocs) {
      if (err) {
        console.log(err);
        return;
      }
      Comment.find({
        article: req.params.id
      }, function(err, commentDocs) {
        if (err) {
          console.log(err);
          return;
        }
        res.render('a', {
          'title': '文章',
          'userInfo': userInfo,
          'articleJSON': articleDocs[0],
          'commentJSON': commentDocs
        });
      });
    });
  },
  delArticle: function(req, res, next) {

    var id = req.params.id;

    Article.find({
      id: id
    }).then(function(docs) {
      if (docs.length && docs[0].author === req.session.user.username) {

        Article.delArticle(id, function() {
          Comment.delComments(id, function() {

            res.json({
              success: 1
            });

          });
        });

      } else {
        res.json({
          success: 0
        });
      }
    });
  },
  getArticleList:function (req,res,next) {

    var userInfo={
      username:req.session.user.username
    };

    Article.getArticleList(userInfo.username,function (docs) {
      
      res.render('user/article',{
        title:req.params.id,
        userInfo:userInfo,
        articleList:docs
      });

    });
  }


};
