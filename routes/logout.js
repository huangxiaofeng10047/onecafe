var express = require('express');
var router = express.Router();
var filter = require('../lib/filter');


router.get('/logout', filter.authorize, function(req, res, next) {

  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      success: 1
    });
  });

});


module.exports = router;
