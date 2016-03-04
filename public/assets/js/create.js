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

	  tinymce.init({
	    selector: '#editor',
	    height: 300,
	    theme: 'modern',
	    plugins: [
	      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
	      'searchreplace wordcount visualblocks visualchars code fullscreen',
	      'insertdatetime media nonbreaking save table contextmenu directionality',
	      'emoticons template paste textcolor colorpicker textpattern imagetools'
	    ],
	    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
	    toolbar2: 'print preview media | forecolor backcolor emoticons',
	    image_advtab: true
	  });

	  $('.form-editor button').click(function() {

	    $.ajax({
	      "url": '/create',
	      "method": 'post',
	      "data": {
	        title: $('#title').val(),
	        content: tinymce.EditorManager.get('editor').getContent()
	      },
	      "dataType": 'json',
	      "success": function(data) {
	        if (data.success) {
	          window.location.href = '/';
	        } else {
	          alert('发布失败');
	        }
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

	  $('.logout_btn').click(function() {
	    $.ajax({
	      url: '/logout',
	      method: 'get',
	      dataType: 'json'
	    }).done(function(data) {
	      if (data.success) {
	        window.location.href = '/login';
	      }
	    });
	  });
	};


/***/ }
/******/ ]);