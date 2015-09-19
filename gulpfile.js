// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require("browser-sync");
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var addsrc = require('gulp-add-src');

// Opens a webserver (usually localhost:3000) and runs the site
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./_site"
        }
    });
});

// Builds the site
gulp.task("jekyll-build", function (gulpCallBack) {
    var spawn = require("child_process").spawn;
    var jekyll = spawn('jekyll', ["build"], {stdio: "inherit"});

    jekyll.on("exit", function (code) {
        gulpCallBack(code === 0 ? null : "ERROR: Jekyll process exited with code: " + code);
    });
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Compile Our Sass
gulp.task('sass', function() {
        return gulp.src('./_sass/main.scss')
        .pipe(sass({
            includePaths: ['_sass'],
            onError: browserSync.notify
        }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/*
 * Takes js files and concatenates it in script.min.js.
 * This file will get minified and saved
 * to the sites /js directory and the projects /js directory.
 * If one javascript changes, the browser gets reloaded.
 */
gulp.task("js", function () {
    gulp.src("./js/prism.js")
        .pipe(addsrc("./js/fontfaceobserver.js"))
        .pipe(addsrc("./js/main.js"))
        .pipe(concat("script.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./js/"))
        .pipe(gulp.dest("./_site/js/"))
        .pipe(browserSync.reload({stream: true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch("./js/*.js", ["js"]);
    gulp.watch('./_sass/**/*.scss', ['sass']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

// Default Task
gulp.task('default', ['jekyll-build', 'js', 'sass', 'browser-sync', 'watch']);
