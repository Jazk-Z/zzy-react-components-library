#!/usr/bin/env node
const gulp = require('gulp')
const ts = require('gulp-typescript')
const glob = require('glob')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const merge2 = require('merge2')
const tsDefaultReporter = ts.reporter.defaultReporter()
const baseTsConfigPath = path.join(process.cwd(), 'tsconfig.json')
const baseConfigPath = path.join(process.cwd(), 'zhongyao.config.js')
const tsConfig = {
  target: 'es6',
  jsx: 'react',
  moduleResolution: 'node',
  declaration: true,
  esModuleInterop: true,
  strict: true,
  allowSyntheticDefaultImports: true
}
let peojectConfig = {}
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
console.log(peojectConfig)
const entryFiles = glob.sync('packages/components/**/*.{tsx, ts}')
const trueEntryFiles = entryFiles.filter(
  (file) => !file.includes('__tests__') && !file.includes('stories')
)
const error = false
gulp.task('compile-ts', (done) => {
  const tscResult = gulp.src(trueEntryFiles).pipe(
    ts(peojectConfig.ts, {
      error(e) {
        tsDefaultReporter.error(e)
        error = true
      },
      finish: tsDefaultReporter.finish
    })
  )
  const checkError = () => {
    if (error && !argv['ignore-error']) process.exit(1)
  }
  tscResult.on('finish', checkError)
  tscResult.on('end', checkError)
  const tsFileConvertJsStream = babelTransform(tscResult.js, useModule)
  const tsdFile = tscResult.dts.pipe(gulp.dest(output))
  return merge2([tsFileConvertJsStream, tsdFile])
})
