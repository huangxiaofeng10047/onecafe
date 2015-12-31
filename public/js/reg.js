$(function(window, undefined) {

  'use strict';

  $('button').click(function() {

    $.ajax({
      url: '/reg',
      method: 'post',
      data: {
        username: $('#username').val(),
        password: $('#password').val()
      },
      dataType: 'json'
    }).done(function(data) {
      if (data.success) {
        alert('注册成功');
        window.location.href = '/login';
      }
    });
  });


}(window));
