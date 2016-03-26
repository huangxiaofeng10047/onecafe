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
 * 表单信息检测
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

  submit({
    title:title,
    content:$editor.summernote('code')
  });


});


/**
 * 表单提交
 */

  function submit(data) {

    var _url=window.location.pathname;

    if(_url.indexOf('update')!=='-1'){
      data.update_at=new Date();
      $.ajax({
        "url": '/q/',
        "method": 'post',
        "dataType": 'json',
        "data": data
      }).done(function (data) {
        if(data.success){
          window.location.href="/";
        }else {
          alert(data.message);
        }
      });
    }

    if(_url.indexOf('/create')!=='-1'){
      $.ajax({
        "url": '/q/create',
        "method": 'post',
        "dataType": 'json',
        "data": data
      }).done(function (data) {
        if(data.success){
          window.location.href="/";
        }else {
          alert(data.message);
        }
      });
    }
  }
