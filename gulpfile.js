var gulp      = require('gulp');
var compass   = require('gulp-compass');
var plumber   = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

var postcss  = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssgrace     = require('cssgrace'),
csswring     = require('csswring'),
csscomb      = require('gulp-csscomb'),
sourcemaps   = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();


gulp.task('watch',function(){

  browserSync.init({
    proxy: "http://localhost/html5/gulpwork/test/"
  });

  gulp.watch('./assets/**/*.scss', ['dosass'] );

  gulp.watch('./*.html').on('change', browserSync.reload);;
  gulp.watch('./assets/js/**').on('change', browserSync.reload);
  gulp.watch('./assets/**/*.js').on('change', browserSync.reload);

});


gulp.task('dosass', function() {

  var processors = [
      autoprefixer({browsers: ['last 1 version']}),
      require('cssgrace'),
      require('csswring')
  ];

  gulp.src('./assets/**/*.scss')
	.pipe(plumber())
    .pipe(compass({
      css: 'assets/css',
      sass: 'assets/sass',
      config_file: './config.rb'
    }))

    .pipe( csscomb() )
    // .pipe( rename({ extname: '.comb.css' }) )
    // .pipe( gulp.dest('./assets') )
    .pipe( postcss( processors ) )
    .pipe( rename({ extname: '.min.css' }) )
    // .pipe(minifyCSS())
    // .pipe(rename('all.min.css') )
    .pipe( gulp.dest('./assets/css') )
    .pipe(browserSync.stream());

    browserSync.reload;
});
