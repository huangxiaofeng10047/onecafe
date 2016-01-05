$(function(window, undefined) {
  'use strict';

  $('header .dropdown-toggle').dropdown().parent().hover(function() {
    $(this).addClass('open');
  },function () {
    $(this).removeClass('open');
  });

  $('.logout-btn').click(function() {
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
