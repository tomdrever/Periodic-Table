var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    shell       = require('gulp-shell'),
    webpack     = require('webpack'),
    gulpWebpack = require('webpack-stream'),
    webserver   = require('gulp-webserver')

gulp.task('static', function() {
    return gulp.src('./public/**/*')
        .pipe(gulp.dest('./dist'))
})

gulp.task('scss', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('webpack', function () {
    return gulp.src('./src/js/index.js')
        .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('./dist/'));
})

gulp.task('build', ['static', 'scss', 'webpack'])

gulp.task('watch', ['build'], function() {
    gulp.watch('public', ['static'])
    gulp.watch('src/scss/**/*.scss', ['scss'])
    gulp.watch('src/js/**/*.js', ['webpack'])
    gulp.watch('src/html/**/*.html', ['webpack'])
    gulp.watch('src/json/**/*.json', ['webpack'])
    gulp.watch('src/res/**/*.*', ['webpack'])
})

gulp.task('run', ['watch'], shell.task([
    'electron .'
]))

gulp.task('serve', ['watch'], function () {
    gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            enable: true,
            open: true
        }))
})
