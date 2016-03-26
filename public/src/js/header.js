require('./sign.js')();

module.exports = function() {
  var timer;
  $('.dropdown').hover(function() {
    clearTimeout(timer);
    $(this).addClass('open');
  }, function() {
    var _self = this;
    timer = setTimeout(function() {
      $(_self).removeClass('open');
    }, 200);
  });

};
