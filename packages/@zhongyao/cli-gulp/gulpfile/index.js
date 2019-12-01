const { series } = require('gulp')
const { compileTs } = require('./compile-ts')

const compileTsTask = (done, module) => {
  compileTs(module).on('finish', done)
}
exports.cjs = (module) => series((done) => compileTsTask(done, module))()
exports.es = (module) => series((done) => compileTsTask(done, module))()
exports.all = () => {
  exports.cjs('cjs')
  exports.es('es')
}
