module.exports = function() {

  var $tabLogin=$('.tab_login'),
      $tabReg=$('.tab_reg');
  $('.toggle_btn').click(function() {
    if($tabLogin.is(':hidden')){
      $tabReg.hide();
      $(this).text('新用户注册');
      $tabLogin.show();
    }else {
      $tabLogin.hide();
      $(this).text('返回登录');
      $tabReg.show();
    }
  });


  var $loginBtn=$('#login_btn'),
      $regBtn=$('#reg_btn');
  $loginBtn.click(function () {
    $.ajax({
      url:'/login',
      method:'post',
      dataType:'json',
      data:{
        username: $('#username_login').val(),
        password: $('#password_login').val()
      }
    }).done(function (data) {
        if(data.success){
          window.location.href="/";
        }else {
          alert('登录失败');
        }
    });
  });






};
