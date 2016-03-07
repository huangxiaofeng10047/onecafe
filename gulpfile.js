var gulp = require('gulp'),
    livereload = require('gulp-livereload');



gulp.task('fresh', function () {    // 这里的watch，是自定义的，写成live或者别的也行

    livereload.listen();
    gulp.watch(['views/**/*.jade','public/**/*.css'],function (file) {
      livereload.changed(file.path);
    });

});
