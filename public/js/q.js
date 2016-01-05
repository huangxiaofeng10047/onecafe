$(function(window, undefined) {

  'use strict';

  $('.delQuestion').click(function() {

    $.ajax({
      url: '/q/' + $('.questionId').val(),
      method: 'delete',
      dataType: 'json'
    }).done(function(data) {
      if (data.success) {
        alert('删除成功');
        window.location.href = '/';
      } else {
        alert('删除失败');
      }
    });

  });

  $('.delComment').click(function() {
    var $this = $(this);
    $.ajax({
      url: '/q/' + $('.questionId').val() + '/' + $this.next().val(),
      method: 'delete',
      dataType: 'json',
      success: function(data) {
        if (data.success) {
          alert('删除成功');
          window.location.href = '/';
        } else {
          alert('删除失败');
        }
      }
    });
  });

  $('.addComment').click(function() {
    $.ajax({
      url: '/q/' + $('.questionId').val(),
      method: 'post',
      data: {
        title: '评论：' + $('.questionTitle').val(),
        content: $('textarea').val()
      },
      dataType: 'json',
      success: function(data) {
        if (data.success) {
          alert('评论成功');
          var comment = $('<p>' + $('textarea').val() + '</p>');
          $('.comments').append(comment);
        } else {
          alert('请登录后评论');
          window.location.href = '/login';
        }
      }
    });
  });

}(window));
