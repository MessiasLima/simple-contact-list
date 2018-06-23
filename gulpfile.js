var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('js', () => {
	gulp.src('src/*.js')
		.pipe(uglify())
		.pipe(concat('bundle.min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('css', () => {
	gulp.src('src/*.css')
		.pipe(cleanCSS())
		.pipe(concat('bundle.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('browserSync', () => {
	browserSync({
		server: {
			baseDir: "./dist/"
		},
		notify: false
	});
});

gulp.task('reload', () => {
	browserSync.reload();
});

gulp.task('watch', () => {
	gulp.watch('src/*.html', ['html', 'reload']);
	gulp.watch('src/*.css', ['css', 'reload']);
	gulp.watch('src/*.js', ['js', 'reload']);
});

gulp.task('default', ['html', 'js', 'css', 'browserSync', 'watch']);
