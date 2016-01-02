var express = require('express');
var router = express.Router();

var filter = require('./filter');
var article = require('../api/article');
var comment = require('../api/comment');
var user = require('../api/user');
var index = require('../api/index');


// 主页
router.get('/', index.getIndex);

// 普通用户
router.get('/reg', user.getReg);
router.post('/reg', user.postReg);
router.get('/login', user.getLogin);
router.post('/login', user.postLogin);
router.get('/logout', user.getLogout);

// 系统管理员
router.get('/admin', user.getAdmin);
router.get('/admin/login', user.getAdminLogin);
router.post('/admin/login', user.postAdminLogin);
router.get('/admin/logout', user.getAdminLogout);

// 用户主页
router.get('/u/:id', filter.userAuthorize, user.getUserHome);

// 文章列表页
router.get('/u/:id/article',filter.authorize, filter.userAuthorize, article.getArticleList);

// 评论列表页
router.get('/u/:id/comment', filter.authorize,filter.userAuthorize, comment.getCommentList);

// 文章发布页
router.get('/article', filter.authorize, article.getCreateArticle);
router.post('/article', filter.authorize, article.createArticle);

// 文章详情页
router.get('/a/:id', filter.articleAuthorize, article.getArticle);
router.post('/a/:id', filter.authorizePOST, filter.articleAuthorize, comment.createComment);
router.delete('/a/:id', filter.authorizePOST, filter.articleAuthorize, article.delArticle);
router.delete('/a/:id/:commentId', filter.authorizePOST, filter.articleAuthorize, comment.delComment);



module.exports = router;
