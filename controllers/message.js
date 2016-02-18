var Message = require('../models/Message');



exports.index=function (req,res) {
  res.render('message',{
    'title':'消息',
    'user':req.session.user || null
  })
};
