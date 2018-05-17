const gulp = require("gulp");
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');

livereload({ start: true });

gulp.task('default', ['watch', "imagemin", "nodemon"]);

gulp.task('sass', function () {
    return gulp.src('./src/sass/style.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./public/stylesheets'))
      .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
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