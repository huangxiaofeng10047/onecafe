var express = require('express');
var router = express.Router();

var filter = require('./filter');
var question = require('../controllers/question');
var comment = require('../controllers/comment');
var user = require('../controllers/user');
var sign = require('../controllers/sign');
var site = require('../controllers/site');
var message = require('../controllers/message');


/**
 * 主页
 */

router.get('/', site.showIndex);
router.get('/aboutus', site.showAboutus);


/*
    登录
*/
router.get('/reg', sign.showReg);
router.post('/reg', sign.reg,sign.login);
router.get('/login', sign.showLogin);
router.post('/login', sign.login);
router.get('/logout', sign.logout);



/*
    用户
*/
router.get('/u/messages', filter.authorize, message.index);

router.get('/u/:id', user.index);
router.get('/myQuestion', filter.authorize, user.showQuestionColl);


/*
    问题
*/

router.get('/q/create', filter.authorize, question.showCreate);
router.post('/q/create', filter.authorize, question.create);

router.get('/q/:id', question.index);
router.get('/q/:id/edit', filter.authorize, question.showEdit);
router.post('/q/:id/edit', filter.authorize, question.edit);
router.delete('/q/:id', filter.authorize, question.delete);

/*
  评论
*/
router.post('/comment/create', filter.authorize, comment.create);
router.delete('/comment/:id', filter.authorize, comment.delete);


module.exports = router;
