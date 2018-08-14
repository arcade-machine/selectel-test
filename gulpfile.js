var gulp = require("gulp");
var stylus = require("gulp-stylus");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var pug = require("gulp-pug");
var svgstore = require("gulp-svgstore");
var browserSync = require("browser-sync").create();
var useref = require("gulp-useref");
var minify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var minicss = require("gulp-csso");
var rename = require("gulp-rename");

gulp.task("stylus", function () {
    return gulp.src("source/stylus/styles.styl")
        .pipe(plumber())
        .pipe(stylus())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("source/css"))
        .pipe(minicss())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest("source/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("pug", function buildHTML() {
   return gulp.src("source/pug/*.pug")
       .pipe(plumber())
       .pipe(pug())
       .pipe(gulp.dest("source"))
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icons/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img/icons"));
});

gulp.task("watch", ["browserSync", "stylus", "pug"], function () {
    gulp.watch("source/stylus/**/*.styl", ["stylus"]);
    gulp.watch("source/pug/*.pug", ["pug"]);
    gulp.watch("source/*.html", browserSync.reload);
    gulp.watch("source/js/*.js", browserSync.reload);
});

gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "source"
        },
    })
});