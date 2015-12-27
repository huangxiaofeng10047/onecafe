var express = require('express');
var router = express.Router();


router.get('/logout', function(req, res, next) {

  if(req.session.signed){

    req.session.signed=false;
    res.json({
      success:1
    });
  }

});


module.exports=router;
