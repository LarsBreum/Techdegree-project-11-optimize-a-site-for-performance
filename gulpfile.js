const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');

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
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('concatJS', () => {
	return gulp.src('./js/*.js')
	.pipe(concat('app.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('minifyJS', ['concatJS'], () => {
	return gulp.src('js/app.js')
	.pipe(uglify())
	.pipe(rename('prod.min.js'))
	.pipe(gulp.dest('./dist/js'))
});

gulp.task('minifyHTML', () => {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyImg', function () {
  gulp.src('img/*/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('build', ['process-css', 'concatJS', 'minifyJS', 'minifyHTML'])

gulp.task('default', ['build']);