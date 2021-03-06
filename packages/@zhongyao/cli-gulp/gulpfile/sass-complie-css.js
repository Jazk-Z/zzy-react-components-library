const gulpSass = require('gulp-sass')
const replaceExtension = require('replace-ext')
const path = require('path')
const applySourceMap = require('vinyl-sourcemaps-apply')
const postCssConfig = require('../config/postcssConfig')
// 因为sass会将导入的文件写入同一个文件  所以 style目录的命名不需要全部 只要一个引入文件就可以 所以需要过滤一些文件
const filePush = (sassObj, file, that, next) => {
  let sassMap
  let sassMapFile
  let sassFileSrc
  let sassFileSrcPath
  let sourceFileIndex
  if (sassObj.map) {
    sassMap = JSON.parse(sassObj.map.toString())
    sassMapFile = sassMap.file.replace(/^stdout$/, 'stdin')
    sassFileSrc = file.relative
    sassFileSrcPath = path.dirname(sassFileSrc)
    if (sassFileSrcPath) {
      sourceFileIndex = sassMap.sources.indexOf(sassMapFile)
      sassMap.sources = sassMap.sources.map((source, index) => {
        return index === sourceFileIndex ? source : path.join(sassFileSrcPath, source)
      })
    }

    sassMap.sources = sassMap.sources.filter((src) => src !== 'stdin' && src)

    sassMap.file = replaceExtension(sassFileSrc, '.css')
    applySourceMap(file, sassMap)
  }

  file.contents = sassObj.css
  file.path = replaceExtension(file.path, '.css')

  that.push(file)
  next()
}
function gulpSassThroughFunc(file, encoding, next) {
  this.push(file.clone())
  if (file.path.match(/(\/|\\)style(\/|\\)index\.scss$/)) {
    const opts = {
      sourceMap: true
    }
    opts.data = file.contents.toString()
    opts.file = file.path
    if (path.extname(file.path) === '.sass') {
      opts.indentedSyntax = true
    }

    if (opts.includePaths) {
      if (typeof opts.includePaths === 'string') {
        opts.includePaths = [opts.includePaths]
      }
    } else {
      opts.includePaths = []
    }

    opts.includePaths.unshift(path.dirname(file.path))
    if (file.sourceMap) {
      opts.sourceMap = file.path
      opts.omitSourceMapUrl = true
      opts.sourceMapContents = true
    }
    filePush(gulpSass.compiler.renderSync(opts), file, this, next)
  } else {
    next()
  }
}
module.exports = gulpSassThroughFunc
