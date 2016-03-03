$(function(window, undefined) {
  'use strict';

  var timer;
  $('.dropdown').hover(function() {
    clearTimeout(timer);
    $(this).addClass('open');
  }, function() {
    var _self=this;
    timer = setTimeout(function() {
      $(_self).removeClass('open');
    }, 200);
  });

  $('.logout_btn').click(function() {
    $.ajax({
      url: '/logout',
      method: 'get',
      dataType: 'json'
    }).done(function(data) {
      if (data.success) {
        window.location.href = '/login';
      }
    });
  });

}(window));
