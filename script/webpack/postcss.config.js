const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  ident: 'postcss',
  plugins: () => [postcssPresetEnv({})]
}
