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
	 * 创建问题
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

	  $.ajax({
	    "url": '/q/create',
	    "method": 'post',
	    "data": {
	      title: title,
	      content: $editor.summernote('code')
	    },
	    "dataType": 'json'
	  }).done(function (data) {
	    if(data.success){
	      window.location.href="/";
	    }else {
	      alert(data.message);
	    }
	  });

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);