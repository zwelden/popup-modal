var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var newer = require('gulp-newer');
var htmlclean = require('gulp-htmlclean');

var source = 'src/';
var build = 'dist/';

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: build
    }
  });
});

gulp.task('js', function () {
  return gulp.src(source + 'js/**/*')
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(build + 'js'));
});

gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('html', function () {
  return gulp.src(source + 'html/**/*')
    .pipe(newer(build))
    .pipe(gulp.dest(build));
});

gulp.task('sass', ['browserSync'], function () {
  return gulp.src(source + 'css/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest(build + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass', 'html', 'js'], function () {
  gulp.watch(source + 'css/scss/**/*.scss', ['sass']);
  gulp.watch(source + 'js/**/*', ['js-watch']);
  gulp.watch(source + 'html/**/*', ['html']);
});
