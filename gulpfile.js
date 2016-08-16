var gulp        = require('gulp'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    tslint      = require('gulp-tslint'),
    tsc         = require('gulp-typescript'),
    sourcemaps  = require('gulp-sourcemaps'),
    less        = require('gulp-less'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    tsProject = tsc.createProject('tsconfig.json');


var vendorCss = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css'
];

var fonts = [
  'node_modules/bootstrap/dist/fonts/**.*{eot,svg,ttf,woff,woff2}'
];

gulp.task('lint', function() {
  return gulp.src([
      'app/**/**.ts'
  ])
  .pipe(tslint({ }))
  .pipe(tslint.report('verbose'));
});

gulp.task('partials', function() {
  return gulp.src('app/**/*.html')
             .pipe(gulp.dest('build'));
});

gulp.task('less', function() {
  return gulp.src('app/main.less')
             .pipe(less())
             .pipe(gulp.dest('build/styles'));
});

gulp.task('vendorCss', function() {
  return gulp.src(vendorCss)
             .pipe(concat('vendor.css'))
             .pipe(gulp.dest('build/styles'));
});

gulp.task('fonts', function() {
  return gulp.src(fonts)
             .pipe(gulp.dest('build/fonts'));
});

gulp.task('build-app', function() {
  return gulp.src([
      'app/**/**.ts',
      'typings/globals/**/*.d.ts'
    ])
    .pipe(tsc(tsProject))
    .js.pipe(gulp.dest('app/'));
});

gulp.task('bundle', function() {
  var libraryName = 'build';
  var mainTsFilePath = 'app/app.js';
  var outputFolder   = 'build/';
  var outputFileName = libraryName + '.min.js';
  var bundler = browserify({
      debug: true,
      standalone : libraryName
  });

  return bundler.add(mainTsFilePath)
          .bundle()
          .pipe(source(outputFileName))
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(uglify())
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(outputFolder));
});

gulp.task('watch', ['default'], function () {

  browserSync.init({
    server: '.'
  });

  gulp.watch('app/**/*.html', ['partials']);
  gulp.watch('app/**/*.less', ['less']);
  gulp.watch('app/**/**.ts', ['default']);
  gulp.watch('build/*.js').on('change', browserSync.reload);
  gulp.watch(['index.html', 'build/**/*.{html,css}']).on('change', browserSync.reload);
});

gulp.task('default', function (cb) {
  runSequence('vendorCss', 'fonts', 'build-app', 'bundle', cb);
});