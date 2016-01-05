var express = require('express');
var router = express.Router();

var filter = require('./filter');
var question = require('../api/question');
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
router.get('/u/:id/question',filter.authorize, filter.userAuthorize, question.getQuestionList);

// 评论列表页
router.get('/u/:id/comment', filter.authorize,filter.userAuthorize, comment.getCommentList);

// 文章发布页
router.get('/question', filter.authorize, question.getCreateQuestion);
router.post('/question', filter.authorize, question.createQuestion);

// 文章详情页
router.get('/q/:id', filter.QuestionAuthorize, question.getQuestion);
router.post('/q/:id', filter.authorizePOST, filter.QuestionAuthorize, comment.createComment);
router.delete('/q/:id', filter.authorizePOST, filter.QuestionAuthorize, question.delQuestion);
router.delete('/q/:id/:commentId', filter.authorizePOST, filter.QuestionAuthorize, comment.delComment);



module.exports = router;
