
// то, что в require(тут) надо загрузить с npm
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
// const sync = require("browser-sync").create();

gulp.task('sass-compile', function(){
	return gulp.src('./source/sass/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./source/css/'))
  .pipe(browserSync.stream());
})


gulp.task('serve', gulp.series('sass-compile', function(){
  browserSync.init({
    server:'source'
  });


  gulp.watch('./source/sass/**/*.scss',gulp.series('sass-compile'));
  gulp.watch("source/*.html").on("change", browserSync.reload);
}))


gulp.task('default', gulp.series('serve'));


// gulp.task('watch', function(){
// 	gulp.watch('./source/sass/**/*.scss', gulp.series('sass-compile'));
//   // gulp.watch('source/*.html').on("change", sync.reload);

// })
