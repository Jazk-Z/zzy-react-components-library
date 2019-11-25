const globby = require('globby')
const path = require('path')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config')

const baseDirPath = path.join(process.cwd(), '../../../', 'packages/components')
// console.log(basePath)
const buildBasePath = path.join(process.cwd(), '../../../', 'cjs')
const fileEntryArr = globby.sync(['*.tsx', '**/(lib|style)/*.tsx', '**/style/*.scss'], {
  cwd: baseDirPath
})
const bundleFiles = (config) => {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || stats.hasErrors())
      }
      resolve()
    })
  })
}
fileEntryArr.reduce((needCompileArr, value) => {
  const webpackConfig = {
    ...baseWebpackConfig,
    entry: {
      [path.basename(value, path.extname(value))]: path.join(baseDirPath, value)
    },
    output: {
      path: path.join(buildBasePath, path.dirname(value)),
      filename: `[name]${path.extname(value) === '.tsx' ? '.js' : path.extname(value)}`
    },
    mode: 'development'
  }
  needCompileArr.push(bundleFiles(webpackConfig))
  return needCompileArr
}, [])
try {
  Promise.all([fileEntryArr[0]])
} catch (e) {
  throw new Error(e)
}
