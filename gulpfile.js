var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');

var jsFolders = ['src/*/*.js', 'src/*.js'];
var cssFolders = ['src/*.css'];
var htmlFolders = ['src/*.html'];

gulp.task('js', () => {
	gulp.src(jsFolders)
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(concat('bundle.min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('css', () => {
	gulp.src(cssFolders)
		.pipe(cleanCSS())
		.pipe(concat('bundle.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
	gulp.src(htmlFolders)
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
	gulp.watch(htmlFolders, ['html', 'reload']);
	gulp.watch(cssFolders, ['css', 'reload']);
	gulp.watch(jsFolders, ['js', 'reload']);
});

gulp.task('default', ['html', 'js', 'css', 'browserSync', 'watch']);
