var gulp = require("gulp");
var browserSync = require("browser-sync");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cleanCSS = require("gulp-clean-css");
var babel = require("gulp-babel");


var params = {
	vendor: {
		css: ["node_modules/material-components-web/dist/material-components-web.min.css"],
		js: ["node_modules/material-components-web/dist/material-components-web.min.js"]
	},
	app: {
		dist: "dist",
		distAssets: "dist/assets",
		css: ["src/*.css"],
		js: [
			"src/*/*.js",
			"src/*.js"
		],
		html: ["src/*.html"],
		assets: ["src/assets/*"]
	}
}

gulp.task("assets", () => {
	gulp.src(params.app.assets)
		.pipe(gulp.dest(params.app.distAssets));
});

gulp.task("js", () => {
	gulp.src(params.app.js)
		.pipe(babel({
			presets: ["env"]
		}))
		.pipe(uglify())
		.pipe(concat("bundle.min.js"))
		.pipe(gulp.dest(params.app.dist));
});

gulp.task("js-vendor", () => {
	gulp.src(params.vendor.js)
		.pipe(concat("vendor.min.js"))
		.pipe(gulp.dest(params.app.dist));
});

gulp.task("css-vendor", () => {
	gulp.src(params.vendor.css)
		.pipe(concat("vendor.min.css"))
		.pipe(gulp.dest(params.app.dist));
});

gulp.task("css", () => {
	gulp.src(params.app.css)
		.pipe(cleanCSS())
		.pipe(concat("bundle.min.css"))
		.pipe(gulp.dest(params.app.dist));
});

gulp.task("html", () => {
	gulp.src(params.app.html)
		.pipe(gulp.dest(params.app.dist));
});

gulp.task("browserSync", () => {
	browserSync({
		server: {
			baseDir: params.app.dist
		},
		notify: false
	});
});

gulp.task("reload", () => {
	browserSync.reload();
});

gulp.task("watch", () => {
	gulp.watch(params.app.html, ["html", "reload"]);
	gulp.watch(params.app.css, ["css", "reload"]);
	gulp.watch(params.app.js, ["js", "reload"]);
	gulp.watch(params.app.assets, ["assets", "reload"]);
});

gulp.task("default", ["js-vendor", "css-vendor", "html", "assets", "css", "js", "browserSync", "watch"]);
