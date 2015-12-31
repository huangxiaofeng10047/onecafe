$(function(window, undefined) {

  'use strict';

  $('.logout-btn').click(function() {
    $.ajax({
      url: '/logout',
      method: 'get',
      dataType: 'json'
    }).done(function(data) {
      if (data.success) {
        alert('登出成功');
        window.location.href = '/login';
      }
    });
  });


}(window));
