const gulp = require("gulp");
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');

gulp.task('default', ['sass:watch', "imagemin", "nodemon"]);

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
  })