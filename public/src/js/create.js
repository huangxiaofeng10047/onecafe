require('./header.js')();


/**
 * 初始化编辑器
 */

var
  autoHeight = $(window).height() - 165,
  $editor = $('#editor');
$editor.summernote({
  lang: 'zh-CN',
  toolbar: [
    ['style', ['bold', 'italic', 'underline']],
    ['para', ['ul', 'ol']],
    ['insert', ['link', 'picture']]
  ],
  minHeight: autoHeight,
  disableDragAndDrop: true

});

/**
 * 创建问题
 */
var $title = $('#title');
$('[data-toggle="tooltip"]').tooltip({
  trigger: 'manual',
  title: '必填',
  placement: 'left'
});

$('.create_box button').click(function() {
  var  title = $title.val();

  $title.keyup(function() {
    if ($(this).val() !== '') {
      $title.parent().tooltip('hide');
    }
  });
  $('.note-editable').keyup(function() {
    if (!$editor.summernote('isEmpty')) {
      $editor.parent().tooltip('hide');
    }
  });
  if (title === '') {
    $title.parent().tooltip('show');
    return;
  }
  if ($editor.summernote('isEmpty')) {
    $editor.parent().tooltip('show');
    return;
  }

  $.ajax({
    "url": '/q/create',
    "method": 'post',
    "data": {
      title: title,
      content: $editor.summernote('code')
    },
    "dataType": 'json'
  }).done(function (data) {
    if(data.success){
      window.location.href="/";
    }else {
      alert(data.message);
    }
  });

});
