var express = require('express');
var router = express.Router();

var filter = require('./filter');
var question = require('../controllers/question');
var comment = require('../controllers/comment');
var user = require('../controllers/user');
var sign = require('../controllers/sign');
var index = require('../controllers/index');

// 聊天页
router.get('/chat', filter.authorize, function (req,res) {


  res.render('chat',{
    title:'聊天',
    username:req.session.username
  });
});

// 主页
router.get('/', index.getIndex);

// 普通用户
router.get('/reg', sign.showReg);
router.post('/reg', sign.reg);
router.get('/login', sign.showLogin);
router.post('/login', sign.login);
router.get('/logout', sign.logout);

// 系统管理员
router.get('/admin', user.getAdmin);
router.get('/admin/login', user.getAdminLogin);
router.post('/admin/login', user.postAdminLogin);
router.get('/admin/logout', user.getAdminLogout);

// 用户主页
router.get('/u/:id', user.getUserHome);

// 文章列表页
router.get('/u/:id/question',filter.authorize, filter.userAuthorize, question.getQuestionList);

// 评论列表页
router.get('/u/:id/comment', filter.authorize,filter.userAuthorize, comment.getCommentList);

// 文章发布页
router.get('/ask', filter.authorize, question.askQuestion);
router.post('/ask', filter.authorize, question.createQuestion);

// 文章详情页
router.get('/q/:id', filter.questionAuthorize, question.getQuestion);
router.post('/q/:id', filter.authorize, filter.questionAuthorize, comment.createComment);
router.get('/q/:id/edit', filter.authorize, filter.questionAuthorize, question.editQuestion);
router.post('/q/:id/edit', filter.authorize, filter.questionAuthorize, question.updateQuestion);

router.delete('/q/:id', filter.authorize, filter.questionAuthorize, question.delQuestion);
router.delete('/q/:id/:commentId', filter.authorize, filter.questionAuthorize, comment.delComment);



module.exports = router;
