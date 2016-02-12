var express = require('express');
var router = express.Router();

var filter = require('./filter');
var question = require('../controllers/question');
var comment = require('../controllers/comment');
var user = require('../controllers/user');
var sign = require('../controllers/sign');
var site = require('../controllers/site');


// 主页
router.get('/', site.showIndex);

// 普通用户
router.get('/reg', sign.showReg);
router.post('/reg', sign.reg);
router.get('/login', sign.showLogin);
router.post('/login', sign.login);
router.get('/logout', sign.logout);

// 系统管理员
// router.get('/admin', user.getAdmin);
// router.get('/admin/login', user.getAdminLogin);
// router.post('/admin/login', user.postAdminLogin);
// router.get('/admin/logout', user.getAdminLogout);

/*
    用户
*/
router.get('/u/:id',user.index);
router.get('/myQuestion', filter.authorize, user.showQuestionColl);



/*
    问题
*/
router.get('/q/:id',question.index);

router.get('/create', filter.authorize, question.showCreate);
router.post('/create', filter.authorize, question.create);
router.get('/q/:id/update',filter.authorize,question.showUpdate);
router.post('/q/:id/update',filter.authorize,question.update);
router.delete('/q/:id', filter.authorize, question.delete);

/*
  评论
*/
router.post('/comment/create',filter.authorize,comment.create);
router.delete('/comment/:id',filter.authorize,comment.delete);




module.exports = router;
