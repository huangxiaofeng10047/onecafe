var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  }
});

var upload = multer({ storage: storage });

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
router.post('/upload',filter.authorize,upload.single('avatar'),site.upload);


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
router.get('/u/settings', user.showSettings);

router.get('/u/:id', user.index);


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
