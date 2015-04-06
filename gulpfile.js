// gulpfile.js
// Luis Matute
// Feb-15

"use strict";

// Dependencies =================================
  var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    minifyHTML = require('gulp-minify-html'),
    pngquant = require('imagemin-pngquant'),
    imagemin = require('gulp-imagemin'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    ngAnnotate = require('gulp-ng-annotate'),
    livereload = require('gulp-livereload');

// Views Task ===================================
  gulp.task('views', function() {
    var opts = {};
    return gulp
      .src('./admin/assets/views/dev/**/*')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./admin/assets/views/prd/'))
      .pipe(livereload());
  });

// Images Task ==================================
  gulp.task('imagemin', function() {
    return gulp.src('./assets/img/**/*')
        .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
        }))
        .pipe(gulp.dest('./assets/img/'));
  });

// SASS Task ====================================
  gulp.task('sass', function() {
    var opt = { trace: true, style: "compressed" };
    return sass('./admin/assets/sass/master.scss', opt)
      .pipe(gulp.dest('./admin/assets/css/'))
      .pipe(notify('Styles Task Completed'))
      .pipe(livereload());
  });

// JS Task ======================================
  gulp.task('lint', function() {
    return gulp
      .src(['./admin/assets/js/**/*.js','!**/*/libs/**/*', '!bundle'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

// Browserify Task ==============================
  gulp.task('browserify', function() {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    return gulp
      .src(['./admin/assets/js/main.js'])
      .pipe(browserify({
        insertGlobals: true,
        debug: false
      }))
      .on('error', gutil.log)
      // Bundle to a single file
      .pipe(concat('bundle.js'))
      // .pipe(ngAnnotate()) // This does the minifyin magic for angular
      // .pipe(uglify({
      //   compress: {
      //     drop_console: true
      //   }
      // }))
      // Output it to our dist folder
      .pipe(gulp.dest('./admin/assets/js/'))
      .pipe(livereload())
      .pipe(notify('Browserify Task Completed'));
  });

// Watch Task ===================================
  gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./admin/assets/js/**/*.js','!./admin/assets/js/bundle.js'],['lint','browserify']);
    gulp.watch('./admin/assets/sass/**/*.scss',['sass']);
    gulp.watch('./admin/assets/views/**/*.html',['views']);
    // gulp.watch('./assets/img/**/*',['imagemin'])
  });

// Main Tasks ===================================
  gulp.task('default', ['dev']);
  gulp.task('dev', ['sass', 'lint', 'browserify', 'watch']);