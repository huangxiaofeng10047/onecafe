$(function(window, undefined) {

  'use strict';


 $('.question-lists .time').each(function () {
   var createdDate=$(this).data('created');
   var relativeDate=moment(createdDate).fromNow();
   $(this).text(relativeDate+'发表了问题');
 });


}(window));
