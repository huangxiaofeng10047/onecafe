var $editor = require('./editor.js');


/**
 * 回复话题
 */
$('.submit_btn').click(function() {
    //有效性检查
    if ($editor.summernote('isEmpty')) {
        $('.note-editor').css({
            "border-color": "#bb3636"
        });
        $('.tooltips').text('必须填写内容').show();
        return;
    }

    var data = {
        content: $editor.summernote('code'),
        question_id: $('.title h3').data('question'),
        reply_to_id: $('.title h3').data('author')
    };

    var
        author = $('.hiddenInfo').data('author'),
        avatarUrl = $('.hiddenInfo').data('avatar'),
        signature = $('.hiddenInfo').data('signature');

    $.ajax({
        "url": '/comment/create',
        "method": 'post',
        "dataType": 'json',
        "data": data
    }).done(function(data) {
        if (data.success) {
            var commentString =
                '<div class="answer-list">' +
                '<div class="author">' +
                '<a href="' + /u/ + author + '"' + '>'+author+'</a>' +
                '<span class="signature">' + signature + '</span>' +
                '<img class="avatar pull-right" src=' + avatarUrl + ' />' +
                '</div>' +
                '<div class="comment">' + data.comment.content + '</div>' +
                '<div class="toolbar">' +
                '<span>发布于 1天前</span>' +
                '<a href="javascript:;">评论</a>' +
                '<a href="javascript:;"  class="del_comment_btn" data-comment="' + data.comment._id + '"' + '>删除</a>' +
                '</div>' +
                '</div>';
            $('.answers').append(commentString);
            $editor.summernote('reset');
            var count=isNaN(parseInt($('.answer-count').text(),10)) ? 1 : parseInt($('.answer-count').text(),10)+1 ;
            $('.answer-count').text(count+'个回答');
        } else {
            alert(data.message);
        }
    });
});


/**
 * 删除回复
 */
$('.answers').on('click', '.del_comment_btn', function() {
    $.ajax({
        "url": '/comment/' + $(this).data('comment'),
        "method": 'delete',
        "dataType": 'json',
    }).done(function(data) {
        if (data.success) {
            window.location.href = window.location.pathname;
        } else {
            alert('删除失败');
        }
    });
});
