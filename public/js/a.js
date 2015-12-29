$(function(window, undefined) {
  'use strict';
  $('button').click(function () {
    $.ajax({
      url:'/a/'+$('.articleId').val(),
      method:'post',
      data:{
        content:$('textarea').val()
      },
      dataType:'json',
      success:function (data) {
        if(data.success){
          alert('评论成功');
          var comment=$('<p>'+$('textarea').val()+'</p>');
          $('.comments').append(comment);
        }else{
          alert('请登录后评论');
          window.location.href='/login';
        }
      }
    });
  });

}(window));
