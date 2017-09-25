'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'), /*for minify css files*/
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    uncss = require('gulp-uncss'), /* Remove unused CSS selectors */
    htmlhint = require("gulp-htmlhint"), /* to validate your HTML */
    csslint = require('gulp-csslint'), /* CSSLint plugin, error css detector */
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        vendor_css: 'build/vendor/css/',
        vendor_js: 'build/vendor/js/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: ['src/js/main.js', 'src/js/**/*.js'],
        style: 'src/css/*.*',
        img: 'src/img/**/*.*',
        vendor_css: 'src/vendor/css/**/*.*',
        vendor_js: 'src/vendor/js/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/*.*',
        img: 'src/img/**/*.*',
        vendor_css: 'src/vendor/css/**/*.*',
        vendor_js: 'src/vendor/js/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "ababich"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass({
            includePaths: ['src/css/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        // .pipe(csslint())/* CSSLint plugin */
        // .pipe(csslint.reporter(customReporter))/* CSSLint plugin */
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('vendor_css:build', function () {
    gulp.src(path.src.vendor_css)
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.vendor_css))
        .pipe(reload({stream: true}));
});

gulp.task('vendor_js:build', function () {
    gulp.src(path.src.vendor_js)
        .pipe(gulp.dest(path.build.vendor_js))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'vendor_css:build',
    'vendor_js:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.vendor_css], function(event, cb) {
        gulp.start('vendor_css:build');
    });
    watch([path.watch.vendor_js], function(event, cb) {
        gulp.start('vendor_js:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);
