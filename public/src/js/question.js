require('./header.js')();
require('./question/editor.js')();




/**
 * 格式化时间
 */
$('.time').each(function () {
  var time=$(this).data('create');
  $(this).text(moment(time).format("YYYY-MM-DD"));
});

/**
 * 删除问题
 */

$('.del_btn').click(function () {
  $.ajax({
    "url": '/q/'+$(this).data('question'),
    "method": 'delete',
    "dataType": 'json'
  }).done(function (data) {
    if(data.success){
      window.location.href='/';
    }else {
      alert(data.message);
    }
  });
});
