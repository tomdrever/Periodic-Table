var gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    shell = require('gulp-shell')

gulp.task('static', function() {
    return gulp.src('./public/**/*')
        .pipe(gulp.dest('./dist'))
})

gulp.task('scss', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('build', ['static', 'scss', 'js'])

gulp.task('watch', ['build'], function() {
    gulp.watch('public', ['static'])
    gulp.watch('src/scss/**/*.scss', ['scss'])
    gulp.watch('src/js/**/*.js', ['js'])
})

gulp.task('run', ['watch'], shell.task([
    'electron .'
]))
