#!/usr/bin/env node
const gulp = require('gulp')
const ts = require('gulp-typescript')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')
const merge2 = require('merge2')
const babelTransform = require('./babel-complie-js')
const sassTransform = require('./sass-complie-css')
// const tsDefaultReporter = ts.reporter.defaultReporter()
const baseTsConfigPath = path.join(process.cwd(), 'tsconfig.json')
const baseConfigPath = path.join(process.cwd(), 'zhongyao.config.js')
const context = process.cwd()
const tsConfig = {
  target: 'es6',
  jsx: 'react',
  moduleResolution: 'node',
  declaration: true,
  esModuleInterop: true,
  strict: true,
  allowSyntheticDefaultImports: true,
  noEmit: false
}
const peojectConfig = {}
if (fs.existsSync(baseConfigPath)) {
  const config = require(baseConfigPath)
  peojectConfig.ts = {
    ...tsConfig,
    ...config
  }
} else {
  peojectConfig.ts = tsConfig
}
if (fs.existsSync(baseTsConfigPath)) {
  const baseTsConfig = require(baseTsConfigPath)
  peojectConfig.ts = {
    ...baseTsConfig,
    compilerOptions: {
      ...peojectConfig.ts,
      ...baseTsConfig.compilerOptions
    }
  }
}
const compileTs = (useModule) => {
  const output = path.join(context, useModule)
  rimraf.sync(output)
  const tsProject = ts.createProject(path.join(context, 'tsconfig.json'), { ...tsConfig })
  const tscResult = gulp
    .src([
      'packages/components/**/!(__tests__|stories)/*.{tsx, ts}',
      'packages/components/*.{tsx, ts}'
    ])
    .pipe(tsProject(ts.reporter.fullReporter()))
  const tsFileConvertJsStream = babelTransform(tscResult.js, useModule, output)
  const tsdFile = tscResult.dts.pipe(gulp.dest(output))
  const sassFileConvertCssStream = sassTransform(output)
  return merge2([tsdFile, tsFileConvertJsStream, sassFileConvertCssStream])
}
// exports.cjs = (context, useModule, output) =>
//   gulp.series((done) => compileTs(done, context, useModule, output))()
exports.compileTs = compileTs
