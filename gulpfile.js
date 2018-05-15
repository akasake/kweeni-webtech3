const gulp = require("gulp");
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');
const less = require('gulp-less');
const livereload = require('gulp-livereload');
let path = require('path');

gulp.task('default', ['sass:watch', "imagemin", "nodemon", "less", "watch"]);

gulp.task('sass', function () {
    return gulp.src('./src/sass/style.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('imagemin', () =>
    gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/images'))
);

gulp.task('nodemon', function () {
    nodemon({
      script: './bin/www'
    , ext: 'js pug'
    , env: { 'NODE_ENV': 'development' }
    })
  });

  gulp.task('less', function() {
    gulp.src('less/*.less')
      .pipe(less())
      .pipe(gulp.dest('./public/stylesheets'))
      .pipe(livereload());
    });

   
  gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('less/*.less', ['less']);
  });