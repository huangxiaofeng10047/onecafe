
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
