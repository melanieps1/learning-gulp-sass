// These variables are our way of calling the installed things into the script
// var <var name> = require('installed thing name');
var gulp   = require('gulp');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var clean  = require('gulp-clean');

// This is a simple sample task to reference
gulp.task('task-name', function() {
	// Task stuff for what we want to happen when that particular task is called
	console.log('Hello there!');
});

// Task to compile any .scss files in /app/scss and put them into /dist/css
gulp.task('sass', ['cleanup'], function () {
	return gulp.src('app/scss/*.scss') //gulp.src identifies source files
	.pipe(sass()) //'pipe' chains commands together, this line processes the file using sass
	.pipe(gulp.dest('app/css')); //identifies a destination/place where you want to put output
});

// Concatenate all scss files together into one
gulp.task('concatenate', ['sass'], function () {
	return gulp.src('app/css/*.css')
	.pipe(concat('all.css'))
	.pipe(gulp.dest('dist/css/')); //should create an all.css file with all of the css in it (main, lists, paragraphs)
}); //after running this (`gulp concatenate`), you should be able to replace all css links in html with just an all.css one

// Cleanup task to get rid of old files
gulp.task('cleanup', function () {
	return gulp.src(['app/css/*.css', 'dist/css/*.css'], {read: false})
	.pipe(clean());
});

// Chain cleanup, sass and concatenate tasks together (so that they happen in order automatically)
gulp.task('sassify', ['cleanup', 'sass', 'concatenate']);

// Set up something to watch the scss folder and run automatically when files change
gulp.task('watch', function() {
	gulp.watch('app/scss/*.scss', ['sassify']);
});
