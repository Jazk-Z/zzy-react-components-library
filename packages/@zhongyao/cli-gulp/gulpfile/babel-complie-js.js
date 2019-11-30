const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const gulp = require('gulp')
const babelConfig = require('../config/babelConfig')

const babelTransform = (js, modules, output) => {
  const config = babelConfig(process.cwd(), modules)
  return js
    .pipe(sourcemaps.init())
    .pipe(babel(config))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(output))
}
module.exports = babelTransform
