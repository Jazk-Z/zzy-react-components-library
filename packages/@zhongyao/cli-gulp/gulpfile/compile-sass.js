const gulp = require('gulp')
const scourceMaps = require('gulp-sourcemaps')
const through2 = require('through2')
const gulpif = require('gulp-if')
const gulpPostCss = require('gulp-postcss')
// const postcss = require('gulp-postcssrc')
// const postcssPresetEnv = require('postcss-preset-env')
const gulpSassThroughFunc = require('./sass-complie-css')
const presetSassConfig = require('../config/postcssConfig')

const baseSearchPath = ['packages/components/**/*.scss']
const sassTransform = (output) => {
  // const plugins = [postcssPresetEnv({})]
  const cssAndScssFileResult = gulp
    .src(baseSearchPath)
    .pipe(scourceMaps.init())
    .pipe(through2.obj(gulpSassThroughFunc))
  const condition = (file) => {
    const fileState = JSON.parse(JSON.stringify(file))
    const filePath = fileState && fileState.sourceMap && fileState.sourceMap.file
    return filePath && filePath.includes('.css')
  }
  return cssAndScssFileResult
    .pipe(
      gulpPostCss(presetSassConfig.plugins(), {
        ident: presetSassConfig.ident,
        syntax: require('postcss-scss')
      })
    )
    .pipe(gulpif(condition, scourceMaps.write('.')))
    .pipe(gulp.dest(output))
}
module.exports = sassTransform
