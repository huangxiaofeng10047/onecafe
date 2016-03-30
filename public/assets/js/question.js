/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)();
	__webpack_require__(3)();




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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)();

	module.exports = function() {
	  var timer;
	  $('.dropdown').hover(function() {
	    clearTimeout(timer);
	    $(this).addClass('open');
	  }, function() {
	    var _self = this;
	    timer = setTimeout(function() {
	      $(_self).removeClass('open');
	    }, 200);
	  });

	};


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);