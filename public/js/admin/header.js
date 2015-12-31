$(function(window, undefined) {

  'use strict';

  $('button').click(function () {

    $.ajax({
      url:'/admin/login',
      method:'post',
      dataType:'json',
      data:{
        username:$('#username').val(),
        password:$('#password').val()
      },
      success:function (data) {
        if(data.success){
          alert('登录成功');
          window.location.href='/admin';
        }else {
          alert('登录失败');
        }
      }

    });

  });


}(window));
