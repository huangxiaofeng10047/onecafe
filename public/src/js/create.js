require('./header.js')();



var autoHeight=$(window).height()-165;
$('#editor').summernote({
  lang: 'zh-CN',
  toolbar: [
    ['style', ['bold', 'italic', 'underline']],
    ['para', ['ul', 'ol']],
    ['insert', ['link', 'picture']]
  ],
  minHeight:autoHeight,
  disableDragAndDrop: true

});
