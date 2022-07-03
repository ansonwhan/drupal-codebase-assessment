'use strict';

// Load configuration from gulp.config.js
/* The gulp.config.js content:
const localServer         = 'https://your-server-name.localhost';
exports.localServer       = localServer;
 */
const config = require('./gulp.config');

const { src, dest, parallel, series, watch } = require('gulp');

const browserSync    = require('browser-sync').create();
const sass           = require('gulp-sass');
const cssbeautify    = require('gulp-cssbeautify');
const livereload     = require('gulp-livereload');
const sourcemaps     = require('gulp-sourcemaps');
const imagemin       = require('gulp-imagemin');
const plumber        = require('gulp-plumber');
const del            = require('del');
const jpegrecompress = require('imagemin-jpeg-recompress');
const pngquant       = require('imagemin-pngquant');
const cache          = require('gulp-cache');
const webp           = require('gulp-webp');
const cached         = require('gulp-cached');
const colors         = require('colors');
const include        = require('gulp-include');
const fixmyjs        = require("gulp-fixmyjs");
const babel          = require('gulp-babel');
const footer         = require('gulp-footer');


/* Path to the src files (src), built files (build), watch folders (watch) */
const path = {
  build: {
    js: 'assets/build/js/',
    css: 'assets/build/css/',
    img: 'assets/build/img/',
    webp: 'assets/build/webp/',
    fonts: 'assets/build/fonts/',
  },
  src: {
    js: ['assets/src/js/**/*.js'],
    style: 'assets/src/style/**/*.scss',
    img: 'assets/src/img/**/*.*',
    fonts: 'assets/src/fonts/**/*.*',
  },
  watch: {
    js: 'assets/src/js/**/*.js',
    css: 'assets/src/style/**/*.scss',
    img: 'assets/src/img/**/*.*',
    fonts: 'assets/srs/fonts/**/*.*',
  },
  clean: './assets/build/*'
};

// Error handling.
function catchError(e) {
  console.log(colors.underline.red(e));
  this.emit('end');
}

// Build js dev.
function jsBuild() {
  return src(path.src.js) // get .js files
    .pipe(plumber(catchError)) // trace the errors
    .pipe(include()) // import files
    // .pipe(fixmyjs({
    //   // JSHint settings here
    // }))
    .pipe(babel({
      presets: ['@babel/env'],
      'comments': false,
      'retainLines': false,
    }))
    .pipe(footer("\n")) // as Babel removes new line at the end of files we add it
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }))
    // .pipe(run('npm run eslint:fix').exec())
    .pipe(livereload());
}

// Build css dev.
function cssBuild() {
  return src(path.src.style) // get .scss files
    .pipe(plumber(catchError)) // trace the errors
    .pipe(sourcemaps.init()) // sourcemap initialization
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', catchError))
    .pipe(cssbeautify(
      {
        indent: '  ',
        autosemicolon: true
      }
    )) // scss -> css
    // .pipe(run('npm run lint').exec())
    // .pipe(run('npm run lint:fix').exec())
    .pipe(sourcemaps.write('./')) // Write sourcemap.
    .pipe(dest(path.build.css))
    .pipe(cached('linting')) // Work only with changed files.
    .pipe(browserSync.reload({ stream: true }))
    .pipe(livereload());
}

// Compress images.
function imageBuild() {
  return src(path.src.img) // path to the images
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({plugins: [{removeViewBox: false}]})
    ])))
    .pipe(dest(path.build.img)); // write images
}

// Compress images.
function webpBuild() {
  return src(path.src.img)
    .pipe(webp({
      quality: 90
    }))
    .pipe(dest(path.build.webp));
}

// Move fonts.
function fontsBuild() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts));
}

// Clear cache.
function cacheClear() {
  return cache.clearAll();
}

// Remove built files.
function cleanBuild() {
  return del(path.clean);
}

// Watch folders for the changes
function startWatch() {
  // if you are using a VM or something like MAMP you will want to use a proxy:
  browserSync.init({
    proxy: config.localServer,
    online: true
  });
  watch(path.watch.css, cssBuild);
  watch(path.watch.js, jsBuild);
  watch(path.watch.img, imageBuild);
  watch(path.watch.img, webpBuild);
  watch(path.watch.fonts, fontsBuild);
}

exports['js:build']    = series(jsBuild);
exports['css:build']   = series(cssBuild);
exports['image:build'] = series(imageBuild);
exports['webp:build']  = series(webpBuild);
exports['fonts:build'] = series(fontsBuild);
exports['cache:clear'] = series(cacheClear);
exports['clean:build'] = series(cleanBuild);
exports.watch          = series(startWatch);
exports.build          = parallel(cssBuild, jsBuild, imageBuild, webpBuild, fontsBuild);
