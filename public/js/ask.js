$(function(window, undefined) {

  'use strict';

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


  tinymce.init({
    selector: '#editor',
    height: 300,
    theme: 'modern',
    plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools'
    ],
    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons',
    image_advtab: true

  });

  $('.form-editor button').click(function() {

    $.ajax({
      "url": '/ask',
      "method": 'post',
      "data": {
        title: $('#title').val(),
        content: tinymce.EditorManager.get('editor').getContent()
      },
      "dataType": 'json',
      "success": function(data) {
        if (data.success) {
          window.location.href = '/';
        } else {
          alert('发布失败');
        }
      }
    });

  });




}(window));
