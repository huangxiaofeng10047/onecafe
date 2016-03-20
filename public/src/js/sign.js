module.exports = function() {




  /**
   * 注册登录tab切换
   */

  var $tabLogin = $('.tab_login'),
    $tabReg = $('.tab_reg');
  $('.toggle_btn').click(function() {
    if ($tabLogin.is(':hidden')) {
      $tabReg.hide();
      $(this).text('新用户注册');
      $tabLogin.show();
    } else {
      $tabLogin.hide();
      $(this).text('返回登录');
      $tabReg.show();
    }
  });

  /**
   * 登录
   */

  var $loginBtn = $('#login_btn');
  $loginBtn.click(function() {
    /**
     * 前端验证
     */
    var checkResult = checkAll($('#username_login').val(), $('#password_login').val());
    if (!checkResult.success) {
      $('.tab_login .tooltips').text(checkResult.message).show();
      return;
    }

    /**
     * 后台验证
     */

    $.ajax({
      url: '/login',
      method: 'post',
      dataType: 'json',
      data: {
        username: $('#username_login').val(),
        password: $('#password_login').val()
      }
    }).done(function(data) {
      if (data.success) {
        window.location.href = "/";
      } else {
        $('.tab_login .tooltips').text(data.message).show();
      }
    });
  });

  /**
   * 注册
   */


  var $regBtn = $('#reg_btn');

  $regBtn.click(function() {

    /**
     * 前端验证
     */
    var checkResult = checkAll($('#username_reg').val(), $('#password_reg').val());
    if (!checkResult.success) {
      $('.tab_reg .tooltips').text(checkResult.message).show();
      return;
    }

    /**
     * 后台验证
     */
    $.ajax({
      url: '/reg',
      method: 'post',
      dataType: 'json',
      data: {
        username: $('#username_reg').val(),
        password: $('#password_reg').val()
      }
    }).done(function(data) {
      if (data.success) {
        window.location.href = "/";
      } else {
        $('.tab_reg .tooltips').text(data.message).show();
      }
    });
  });



  /**
   * check username & passowrd
   * @return {}       [error message]
   */
  function checkAll(username, password) {

    if (username === '') {
      return {
        success: 0,
        message: '用户名不能为空。'
      };
    }
    if (!(/^[a-zA-Z0-9\-_]+$/i).test(username)) {
      return {
        success: 0,
        message: '用户名不合法。'
      };
    }
    if (username.length < 5) {
      return {
        success: 0,
        message: '用户名至少需要5个字符。'
      };
    }

    if (password.length < 8) {
      return {
        success: 0,
        message: '密码至少需要8个字符。'
      };
    }
    return {
      success: 1
    };
  }





};
