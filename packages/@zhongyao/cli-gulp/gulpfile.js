#!/usr/bin/env node
const gulp = require('gulp')
const ts = require('gulp-typescript')
const glob = require('glob')
// const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const merge2 = require('merge2')

// const tsDefaultReporter = ts.reporter.defaultReporter()
const baseTsConfigPath = path.join(process.cwd(), 'tsconfig.json')
const baseConfigPath = path.join(process.cwd(), 'zhongyao.config.js')
// console.log(process.cwd())
const tsConfig = {
  target: 'es6',
  jsx: 'react',
  moduleResolution: 'node',
  declaration: true,
  esModuleInterop: true,
  strict: true,
  allowSyntheticDefaultImports: true
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
const babelTransform = () => {}
const error = false
const compileTs = (done, context, useModule, output) => {
  const fileContext = path.join(context, 'packages/components/**/*.{tsx, ts}')
  console.log(fileContext)
  const tsProject = ts.createProject(path.join(context, 'tsconfig.json'), { ...tsConfig })
  const entryFiles = glob.sync(fileContext)
  const trueEntryFiles = entryFiles.filter(
    (file) => !file.includes('__tests__') && !file.includes('stories')
  )
  console.log(trueEntryFiles)
  // console.log(peojectConfig.ts)
  const tscResult = gulp.src(trueEntryFiles).pipe(tsProject(ts.reporter.fullReporter()))
  const checkError = () => {
    if (error && !argv['ignore-error']) process.exit(1)
  }
  tscResult.on('finish', checkError)
  tscResult.on('end', checkError)
  // const tsFileConvertJsStream = babelTransform(tscResult.js, useModule)
  // console.log(output)
  const tsdFile = tscResult.dts.pipe(gulp.dest(output))
  // console.log(tsdFile)
  merge2([tsdFile]).on('finish', done)
}
exports.cjs = (context, useModule, output) =>
  gulp.series((done) => compileTs(done, context, useModule, output))()
