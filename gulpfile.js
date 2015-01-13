var gulp = require('gulp'),
  rename = require("gulp-rename"),
  csso = require('gulp-csso'),
  sass = require('gulp-sass'),
  rev = require('gulp-rev'),
  minifyHTML = require('gulp-minify-html'),
  wiredep = require('wiredep').stream,
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  stripDebug = require('gulp-strip-debug'),
  size = require('gulp-size'),
  jshint = require('gulp-jshint'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  bower_files = require('bower-files')({dir: './app/bower_components'})
  htmlreplace = require('gulp-html-replace'),
  karma = require('karma').server,
  clean = require('gulp-clean');

var CFG = require("./config.json");

var SRC = {
  js: [
    './app/**/*.js', 
    '!./app/bower_components/**/*',
    '!*.spec.js',
    '!*.e2e.js'
  ],
  scss: './app/assets/styles/main.scss',
  html: './app/**/*.html'
};

var BUILD_DEST = "./build";

/*******************************************
 * error handling
 *******************************************/
var plumber = require('gulp-plumber');
var onError = function (err) {
  console.log(err);
};

/*******************************************
 * default
 *******************************************/
gulp.task('default', function() {
  console.log("");
  console.log("========================================");
  console.log("usage:");
  console.log("----------------------------------------");
  console.log("gulp serve: start local development server");
  console.log("gulp build: prepare production pack in buil directory");
  console.log("gulp serve:build: start local production server");
  console.log("gulp test: run test once and exit");
  console.log("gulp tdd: watch for file changes and re-run tests on each change");
  console.log("========================================");
  console.log("");
});

/*******************************************
 * build
 *******************************************/

gulp.task('build:clean', function () {
  gulp.src(BUILD_DEST + '/**/*.*', { read: false })
    .pipe(clean());
});

gulp.task('build:strings', function() {  
  gulp.src('./app/assets/strings/**/*.json')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(BUILD_DEST + '/assets/strings'));
});

gulp.task('build', [
    'build:clean', 
    'bower',
    'build:scripts', 
    'build:strings', 
    'build:styles', 
    'build:images',
    'build:html'
  ], function() {  
  console.log('built on ' + BUILD_DEST);
});

gulp.task('serve:build', ['build'], function(){
  browserSync({
    server: {
      baseDir: BUILD_DEST
    },
    port: browserSyncConfig.port
  });
});

/*******************************************
 * development
 *******************************************/

gulp.task('dev:clean', function () {
  gulp.src('./tmp/**/*.*', { read: false })
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch([SRC.scss, SRC.js, SRC.html], function(event){
    return gulp.src(event.path)
      .pipe(reload({ stream: true }));
  });
  gulp.watch(SRC.scss, ['dev:styles']);
  gulp.watch(SRC.js, ['jshint']);
  gulp.watch('bower.json', ['bower']);
});

var browserSyncConfig = {
    server: {
      baseDir: "./app",
    },
    port: CFG.server.port
  };

gulp.task('browser-sync', function() {
  browserSync(browserSyncConfig);
});

gulp.task('serve', [
  'dev:clean', 
  'bower', 
  'dev:styles', 
  'jshint', 
  'watch', 
  'browser-sync'
]);

/*******************************************
 * bower components
 *******************************************/

gulp.task('bower:html', function () {
  return gulp.src('./app/index.html')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(wiredep({
      directory: './app/bower_components',
      exclude: [
        'bower_components/es5-shim/es5-shim.js',
        'bower_components/json3/lib/json3.js'
      ]
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('bower:css', function () {
  return gulp.src(SRC.scss)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(wiredep({
      directory: './app/bower_components'
    }))
    .pipe(gulp.dest('./app/assets/styles'));
});

gulp.task('bower', ['bower:html', 'bower:css']);

/*******************************************
 * scripts
 *******************************************/

gulp.task('build:scripts', ['build:scripts:application', 'build:scripts:vendor']);

gulp.task('build:scripts:application', function() {  
  gulp.src(SRC.js)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(stripDebug())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(size())
    .pipe(gulp.dest(BUILD_DEST + '/assets'));
});

gulp.task('build:scripts:vendor', function() {  
  gulp.src(bower_files.js)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(size())
    .pipe(gulp.dest(BUILD_DEST + '/assets'));
});

gulp.task('jshint', function() {  
  gulp.src(SRC.js)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

/*******************************************
 * styles
 *******************************************/

gulp.task('build:styles', ['build:styles:application', 'build:styles:vendor']);

gulp.task('build:styles:application', function() {
  gulp.src(SRC.scss)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(size())
    .pipe(gulp.dest(BUILD_DEST + '/assets'));
});

gulp.task('build:styles:vendor', function() {
  gulp.src(bower_files.css)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(concat('vendor.css'))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(size())
    .pipe(gulp.dest(BUILD_DEST + '/assets'));
});

gulp.task('dev:styles', function() {  
  gulp.src(SRC.scss)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(size())
    .pipe(gulp.dest('./app/assets/styles'));
});

gulp.task('sass', function () {
  gulp.src(SRC.scss)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(gulp.dest('./.tmp/app/assets/styles'));
});

/*******************************************
 * html
 *******************************************/

gulp.task('build:html', function () {
  return gulp.src(SRC.html)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(htmlreplace({
      'css': '/assets/main.min.css',
      'vendorcss': '/assets/vendor.min.css',
      'js': '/assets/main.min.js',
      'vendorjs': '/assets/vendor.min.js',
      'oldieshimjs': '/assets/oldieshim.min.js'
    }))
    .pipe(minifyHTML())
    .pipe(size())
    .pipe(gulp.dest(BUILD_DEST));
});

/*******************************************
 * images
 *******************************************/

gulp.task('build:images', function () {
  return gulp.src('./app/assets/images/**/*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(BUILD_DEST + "/assets"));
});

/*******************************************
 * test
 *******************************************/

//Run test once and exit
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

//Watch for file changes and re-run tests on each change
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});