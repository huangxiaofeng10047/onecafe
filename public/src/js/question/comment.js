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

    $.ajax({
        "url": '/comment/create',
        "method": 'post',
        "dataType": 'json',
        "data": data
    }).done(function(data) {
        if (data.success) {
            var commentString =
              '<div class="answer-list">'+
                '<div class="author">' +
                  '<a href="'+/u/+data.comment.author_id+'"'+'>zxczxc</a>'+
                  '<span class="signature">我是一只什么鱼</span>' +
                  '<div class="avatar pull-right">dd</div>' +
                '</div>' +
                '<div class="comment">' + data.comment.content + '</div>' +
                '<div class="toolbar">' +
                  '<span>发布于 1天前</span>' +
                  '<span>评论</span>' +
                '</div>'+
              '</div>';
            $('.answers').append(commentString);
        } else {
          alert('评论失败');
        }
    });

});
