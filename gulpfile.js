var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	open = require('open'),
	express = require('express'),
	port = parseInt(process.argv[2]) || 80,
	less = require('gulp-less'),
	path = require('path'),
	fs = require('fs'),
	glob = require('glob'),
	concat = require('gulp-concat-sourcemap');

gulp.task('server', function(next){
	var server = express().use(express.static( __dirname + '/public' )).listen(port, next);
	var portStr = port == 80 ? '' : ':' + port;
	console.log('Serving ' + 'http://localhost' + portStr);
	open("http://localhost" + portStr, "chrome");
});

gulp.task('build', function(){
	gulp.src([
		'./src/enter.js',
		'./src/utils.js',
		'./src/log.class.js',
		'./src/var.class.js',
		'./src/group.class.js',
		'./src/closureGroup.class.js',
		'./src/fileGroup.class.js',
		'./src/functionGroup.class.js',
		'./src/functionDefinition.class.js',
		'./src/cbGroup.class.js',
		'./src/cbDefinition.class.js',
		'./src/logger.js',
		'./src/loggerEvents.js',
		'./src/exit.js',

	]).pipe(concat('log.js'))
	.pipe(gulp.dest('./public/'));
});

gulp.task('default', ['build', 'server'], function(){
	var refresh = livereload();
	console.log('watching');

	gulp.watch(['public/**']).on('change', function(file){
		refresh.changed(file.path);
	});

	gulp.watch('public/**/*.less').on('change', function(file){
		console.log('less changedd', file);
		return gulp.src(file.path)
			.pipe(less({
				paths: [file.path]
			}))
			.pipe(gulp.dest(path.dirname(file.path)));
	});

	gulp.watch('./src/*.js', ['build']);
});