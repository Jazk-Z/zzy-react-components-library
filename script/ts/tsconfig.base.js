const path = require('path')
const fs = require('fs')

const basePath = path.join(process.cwd(), 'tsconfig.json')
// eslint-disable-next-line import/no-dynamic-require
const baseConfig = require(basePath)
let baseTsConfig = {}
if (fs.existsSync(basePath)) {
  baseTsConfig = baseConfig
}
module.exports = {
  noUnusedParameters: true,
  noUnusedLocals: true,
  strictNullChecks: true,
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true,
  allowSyntheticDefaultImports: true,
  ...baseTsConfig
}
