let gulp = require('gulp');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');


gulp.task('process-css', () => {
	let plugins = [
		autoprefixer({
			browsers: ['last 3 versions']
		})
	];
	return gulp.src('./css/*.css')
		.pipe(postcss(plugins))
		.pipe(cleanCSS())
		.pipe(concat('prod.min.css'))
		.pipe(gulp.dest('./dist'));
});


gulp.task('default', () => {
	console.log('hello from gulp');
});