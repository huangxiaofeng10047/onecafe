var Message = require('../models/Message');


exports.index = function(req, res) {


res.render('user/messages', {
  'title': '消息',
  'user': req.session.user || null,
  'message':req.session.user.message || []
});

  Message.find({
    reply_to_id: req.session.user._id,
    has_read:false
  }).then(function(messages) {
      return Promise.resolve(messages);
  }).map(function(message) {
    message.has_read = true;
    message.save();
  }).catch(function(err) {
    return console.log('err', err);
  });


};
