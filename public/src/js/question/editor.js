/**
 * 初始化编辑器
 */

module.exports=function () {

  var  $editor = $('#editor');
  $editor.summernote({
    lang: 'zh-CN',
    toolbar: [
      ['style', ['bold', 'italic', 'underline']],
      ['para', ['ul', 'ol']],
      ['insert', ['link', 'picture']]
    ],
    minHeight: 130,
    disableDragAndDrop: true
  });
  
};
