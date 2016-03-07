require('./header.js')();

$('#editor').summernote({
  lang: 'zh-CN',
  toolbar: [
    ['style', ['bold', 'italic', 'underline']],
    ['para', ['ul', 'ol']],
    ['insert', ['link', 'picture']]
  ],
  minHeight:300,
  disableDragAndDrop: true

});
