var gulp = require('gulp'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// --------------------------------------------------
// Folder paths

var sassSourceFolderPath = 'src/scss';
var imagesSourceFolderPath = 'src/images';
var jsSourceFolderPath = 'src/js';
var htmlSourceFolderPath = 'src';

var sassDesinationFolderPath = 'dist/';
var imagesDestinationFolderPath = 'dist/';
var jsDestinationFolderPath = 'dist/';
var htmlDestinationFolderPath = 'dist/';

// --------------------------------------------------
// Sass
// --------------------------------------------------

var onSassError = function (err) {
    //var fileName = _.last(err.file.split('/')),
    //    message = err.message;

    //notifier.notify({
    //    title: 'Sass Error',
    //    message: message
    //});

    console.log('\n********** Sass error **********');
    console.log(' ', err);
    console.log('\n********************************');
};

gulp.task('compileSass', function () {

    gulp.src(sassSourceFolderPath + '/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './dist',
            sass: './src/scss'
        }))
        .on('error', function (err) { console.log(err.message); })
        .pipe(rename('main.css'))
        .pipe(gulp.dest(sassDesinationFolderPath));

});

gulp.task('compileSassMin', function () {

    gulp.src(sassSourceFolderPath + '/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './dist',
            sass: './src/scss'
        }))
        .on('error', function (err) { console.log(err.message); })
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(sassDesinationFolderPath));

});

gulp.task('scripts', function() {
    gulp.src(jsSourceFolderPath + '/**/*.js')
        //.pipe('scrollRevealer.js')
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest(jsDestinationFolderPath));
});

gulp.task('scriptsMin', function() {
    gulp.src(jsSourceFolderPath + '/**/*.js')
        //.pipe('scrollRevealer.min.js')
        .pipe(rename('scrollRevealer.min.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify({mangle: false}).on('error', function (err) { console.log(err.message); }))
        .pipe(gulp.dest(jsDestinationFolderPath));
});


// --------------------------------------------------
// Meta tasks

gulp.task('dist', ['compileSass', 'compileSassMin', 'scripts', 'scriptsMin']);

gulp.task('default', ['dist'], function() {

    gulp.watch(sassSourceFolderPath + '/**/*.*', function() {
        gulp.run('compileSass');
    });
    gulp.watch(jsSourceFolderPath + '/**/*.*', function() {
        gulp.run('scripts');
    });
    //
    //gulp.watch(imagesSourceFolderPath + '/**/*.*', function() {
    //    gulp.run('copyImages');
    //});
    //
    //gulp.watch(['source/index.html'], function() {
    //    gulp.run('copyHTML');
    //});

});