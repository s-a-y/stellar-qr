const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babel = require('babelify');
const less = require('gulp-less');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const sourceFile = 'index';
const bundleName = 'widget';
const paths = {
  scripts: {
    src: `./widget/src/scripts/${sourceFile}.js`,
    bundle: './widget/bundle',
    watch: './widget/src/**/*.js',
  },
  styles: {
    src: `./widget/src/styles/${sourceFile}.less`,
    bundle: './widget/bundle',
    watch: './widget/src/**/*.less',
  },
};

// eslint-disable-next-line
gulp.task('build:scripts', () => {
  return browserify(paths.scripts.src, { debug: true })
    .transform(babel, { presets: ['env'] })
    .bundle()
    .on('error', function errorHandler(err) {
      // eslint-disable-next-line
      console.error(err);
      this.emit('end');
    })
    .pipe(source(`${bundleName}.js`))
    .pipe(buffer())
    .pipe(uglify().on('error',console.log))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.bundle));
});

// eslint-disable-next-line
gulp.task('build:styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(rename({ basename: bundleName }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.bundle));
});

gulp.task('watch:scripts', () => {
  gulp.watch(paths.scripts.watch, ['build:scripts']);
});

gulp.task('watch:styles', () => {
  gulp.watch(paths.scripts.watch, ['build:styles']);
});

gulp.task('build', ['build:scripts', 'build:styles']);
gulp.task('watch', ['watch:scripts', 'watch:styles']);
gulp.task('default', ['build']);
