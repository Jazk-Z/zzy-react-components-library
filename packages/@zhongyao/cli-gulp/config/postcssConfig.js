const postcssPresetEnv = require('postcss-preset-env')
const browsersConfig = require('./browsersConfig')

module.exports = {
  ident: 'postcss',
  plugins: () => [postcssPresetEnv({ ...browsersConfig.browsers })]
}
