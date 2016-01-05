$(function(window, undefined) {

  'use strict';

  $('button').click(function() {
    $.ajax({
      url: '/login',
      method: 'post',
      data: {
        username: $('#username').val(),
        password: $('#password').val()
      },
      dataType: 'json'
    }).done(function(data) {
      if (data.success) {
        window.location.href = '/';
      } else {
        alert('该用户不存在');
      }
    });
  });


}(window));
