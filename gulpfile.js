var gulp = require('gulp'),
    livereload = require('gulp-livereload');



gulp.task('fresh', function () {   
    livereload.listen();
    gulp.watch(['views/**/*.jade','public/**/*.css'],function (file) {
      livereload.changed(file.path);
    });

});
