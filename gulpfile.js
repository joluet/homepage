// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require("browser-sync");
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

// Opens a webserver (usually localhost:3000) and runs the site
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./_site"
        }
    });
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['browser-sync']);// ['lint', 'sass', 'scripts', 'watch']);
