let gulp = require('gulp');
let sass = require('gulp-sass');

var sassConfig = {
	inputDirectory: 'scss/**/*.scss',
	outputDirectory: 'assets/css',
	options: {
		outputStyle: 'expanded'
	}
}

gulp.task('build-css', function() {
	return gulp
		.src(sassConfig.inputDirectory)
		.pipe(sass(sassConfig.options).on('error', sass.logError))
		.pipe(gulp.dest(sassConfig.outputDirectory))
});

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['build-css']);
});

// Default Task
gulp.task('default', ['build-css']);