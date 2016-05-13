require('./header')();

$('#changeAvatarBtn').click(function () {
  $('#avatarFile').trigger('click');
});


$('input[type="file"]').ajaxfileupload({
   'action': '/upload',
   'onComplete': function(response) {
     var imageUrl=response.path;
     $('#avatar').attr('src',imageUrl);
   },
   'onStart': function() {
   },
   'onCancel': function() {
     console.log('no file selected');
   }
 });
