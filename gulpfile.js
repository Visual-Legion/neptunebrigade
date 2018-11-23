/* jshint node: true */
/* global $: true */
"use strict";

var gulp = require("gulp"),
	/** @type {Object} Loader of Gulp plugins from `package.json` */
	$ = require("gulp-load-plugins")(),
	/** @type {Array} JS source files to concatenate and uglify */
	uglifySrc = [
		/** Modernizr */
		"src/bower_components/modernizr/modernizr.js",
		/** Conditionizr */
		"src/js/lib/conditionizr-4.3.0.min.js",
		/** jQuery */
		"src/bower_components/jquery/dist/jquery.js",

		/*POPIP JS*/
		// "src/bower_components/magnific-popup/dist/jquery.magnific-popup.js",

		/** pagepiling **/
		"src/js/lib/jquery.pagepiling.min.js",

		/** Page scripts */
		// "src/js/scripts.js"
		// "src/js/build/scripts.js"
		"src/js/build/bundle.js"
	],
	/** @type {Object of Array} CSS source files to concatenate and minify */
	cssminSrc = {
		development: [
			/** The banner of `style.css` */
			"src/css/banner.css",
			/** Theme style */
			"src/css/style.css"
		],
		production: [
			/** The banner of `style.css` */
			"src/css/banner.css",
			/** Normalize */
			"src/bower_components/normalize.css/normalize.css",

			/*POPIP CSS*/
			// 'src/bower_components/magnific-popup/dist/magnific-popup.css',
			/** Theme style */

			"src/css/lib/jquery.pagepiling.css",

			"src/css/style.css"
		]
	},
	/** @type {String} Used inside task for set the mode to 'development' or 'production' */
	env = ( function() {
		/** @type {String} Default value of env */
		var env = "development";

		/** Test if there was a different value from CLI to env
			Example: gulp styles --env=production
			When ES6 will be default. `find` will replace `some`  */
		process.argv.some(function(key) {
			var matches = key.match(/^\-{2}env\=([A-Za-z]+)$/);

			if (matches && matches.length === 2) {
				env = matches[1];
				return true;
			}
		});

		return env;
	}());

// var browserify = require('browserify');
	// var babelify = require('babelify');

// var source = require('vinyl-source-stream');
	// var buffer = require('vinyl-buffer');
	// var sourcemaps = require('gulp-sourcemaps');
	// var util = require('gulp-util');

var babel = require('gulp-babel');
var print = require('gulp-print');

/** Clean */
gulp.task("clean", require("del").bind(null, [".tmp", "dist"]));

/** Copy */
gulp.task("copy", function() {
	return gulp.src([
		"src/*.{php,png,css}",
		"src/modules/*.php",
		"src/img/**/*.{jpg,png,svg,gif,webp,ico}",
		"src/fonts/*.{woff,woff2,ttf,otf,eot,svg}",
		"src/languages/*.{po,mo,pot}"
	], {
		base: "src"
	})
		.pipe(gulp.dest("dist"));
});

/** CSS Preprocessors */
gulp.task("sass", function() {
	return gulp.src("src/css/sass/style.scss")
		.pipe($.sourcemaps.init())
		.pipe($.sass())
		.pipe($.sourcemaps.write("."))
		.on("error", function(e) {
			console.error(e);
		})
		.pipe(gulp.dest("src/css"));
});

/** STYLES */
gulp.task("styles", ["sass"], function() {
	console.log("`styles` task run in `" + env + "` environment");

	var stream = gulp.src(cssminSrc[env])
		.pipe($.concat("style.css"))
		.pipe($.autoprefixer("last 2 version"));

	if (env === "production") {
		stream = stream.pipe($.csso());
	}

	return stream.on("error", function(e) {
		console.error(e);
	})
		.pipe(gulp.dest("src"));
});

/** JSHint */
// gulp.task("jshint", function() {
// 	/** Test all `js` files exclude those in the `lib` folder */
// 	return gulp.src("src/js/{!(lib)/*.js,*.js}")
// 		.pipe($.jshint())
// 		.pipe($.jshint.reporter("jshint-stylish"))
// 		.pipe($.jshint.reporter("fail"));
// });

gulp.task('libs', function() {
	return gulp.src([
		'node_modules/systemjs/dist/system.js',
		'node_modules/babel-polyfill/dist/polyfill.js'])
		.pipe(print())
		.pipe(gulp.dest('src/js/lib'));
// .pipe(gulp.dest('dist/js'));
});

gulp.task('js', function() {
	// return gulp.src("src/js/{!(lib)/*.js,*.js}") // #1. select all js files in the app folder
	// return gulp.src("src/js/code/scripts.js") // We only need scripts as it imports the rest no?
	return gulp.src("src/js/code/bundle.js") // We only need scripts as it imports the rest no?
		.pipe(print()) // #2. print each file in the stream
		.pipe(babel({
			presets: ['es2015']
		})) // #3. transpile ES2015 to ES5 using ES2015 preset
		// .pipe(gulp.dest('src/js')); // #4. copy the results src folder 
		.pipe(gulp.dest('src/js/build')); // #4. copy the results src folder 

		// var b = browserify({
		// 	entries: 'src/js/code/scripts.js',
		// 	// require: ['src/js/code/cookie.js'],
		// 	debug: true,
		// 	transform: [babelify.configure({
		// 		presets: ['es2015']
		// 	})]
		// });

		// return b.bundle()
		// 	.pipe(source('src/js/code/scripts.js'))
		// 	.pipe(buffer())
		// 	.pipe(sourcemaps.init({
		// 		loadMaps: true
		// 	}))
		// 	// Add other gulp transformations (eg. uglify) to the pipeline here.
		// 	.on('error', util.log)
		// 	.pipe(sourcemaps.write('src/js/build'))
		// 	.pipe(gulp.dest('src/js/build'));

});


/**/

/** Templates */
gulp.task("template", function() {
	console.log("`template` task run in `" + env + "` environment");

	var is_debug = (env === "production" ? "false" : "true");

	return gulp.src("src/dev-templates/is-debug.php")
		.pipe($.template({
			is_debug: is_debug
		}))
		.pipe(gulp.dest("src/modules"));
});

/** Uglify */
gulp.task("uglify", function() {
	return gulp.src(uglifySrc)
		.pipe($.concat("scripts.min.js"))
		.pipe($.uglify())
		.pipe(gulp.dest("dist/js"));
});

/** `env` to 'production' */
gulp.task("envProduction", function() {
	env = "production";
});

/** Livereload */
// gulp.task("watch", ["template", "styles", "jshint"], function() {
gulp.task("watch", ["template", "styles", "js", "libs"], function() {
	var server = $.livereload;
	server.listen();

	/** Watch for livereoad */
	gulp.watch([
		"src/js/**/*.js",
		"src/*.php",
		"src/*.css"
	]).on("change", function(file) {
		console.log(file.path);
		server.changed(file.path);
	});

	/** Watch for autoprefix */
	gulp.watch([
		"src/css/*.css",
		"src/css/sass/**/*.scss"
	], ["styles"]);

	/** Watch for JSHint */
	// gulp.watch("src/js/{!(lib)/*.js,*.js}", ["jshint"]);
	// gulp.watch("src/js/{!(lib)/*.js,*.js}", ["js", "libs"]);

});

/** Build */
gulp.task("build", [
	"envProduction",
	"clean",
	"template",
	"styles",
	// "jshint",
	"js",
	"libs",
	"copy",
	"uglify"
], function() {
	console.log("Build is finished");
});

/** Gulp default task */
gulp.task("default", ["watch"]);
