require('./header.js')();
require('./question/editor.js')();




/**
 * 格式化时间
 */
$('.time').each(function () {
  var time=$(this).data('create');
  $(this).text(moment(time).format("YYYY-MM-DD"));
});
