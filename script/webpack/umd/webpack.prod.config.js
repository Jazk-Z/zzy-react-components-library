const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = {
  context: path.join(process.cwd()),
  mode: 'production',
  ...baseWebpackConfig,
  entry: {
    'zzyui.min': ['./index']
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        cache: true,
        terserOptions: { warnings: false },
        extractComments: false
      }),
      new OptimizeCSSAssertsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require.resolve('cssnano'),
        cssProcessorOptions: {
          safe: true,
          discardComments: { removeAll: true },
          autoprefixer: { disable: true },
          map: {
            inline: false,
            annotation: true
          }
        }
      })
    ]
  },
  plugins: [
    ...baseWebpackConfig.plugins,
    new webpack.optimize.ModuleConcatenationPlugin() // babel modules => false能用 所以适配umd
  ]
}
