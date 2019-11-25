const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = {
  context: path.join(process.cwd()),
  mode: 'development',
  entry: {
    zzyui: './index'
  },
  ...baseWebpackConfig
}
