$(function(window, undefined) {

  'use strict';


  // 删除提问
  $('.delQuestion').click(function() {
    $.ajax({
      url: '/q/' + $('.questionId').data('id'),
      method: 'delete',
      dataType: 'json'
    }).done(function(data) {
      if (data.success) {
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    });
  });

  //显示隐藏评论文本框
  $('.comment-btn').click(function () {

    if($(".comment-wiget").is(":hidden")){
         $(".comment-wiget").show();
     }else{
         $(".comment-wiget").hide();
     }

  });

  // 添加评论
  $('.addComment').click(function() {

    $.ajax({
      url: '/comment/create',
      method: 'post',
      data: {
        title: '评论：' + $('.questionTitle').val(),
        content: $('textarea').val(),
        question_id:$('.questionId').data('id')
      },
      dataType: 'json',
      success: function(data) {
        if (data.success) {
          window.location.href = '/q/' + $('.questionId').data('id');
        } else {
          alert('请登录后评论');
          window.location.href = '/login';
        }
      }
    });
  });

  // 删除评论
  $('.delComment').click(function() {
    var $this = $(this);
    $.ajax({
      url: '/comment/' + $this.data('id'),
      method: 'delete',
      dataType: 'json'
    }).done(function (data) {
      if (data.success) {
        window.location.href ='/q/' + $('.questionId').data('id');
      } else {
        alert(data.message);
      }
    });
  });


}(window));
