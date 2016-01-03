$(function(window, undefined) {
  'use strict';
  $('header .dropdown-toggle').dropdown().parent().hover(function() {
    $(this).addClass('open');
  },function () {
    $(this).removeClass('open');
  });

}(window));
