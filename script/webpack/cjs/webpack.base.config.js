const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const babelConfig = require('../../babel/babel.base.config')
const postcssConfig = require('../postcss.config')

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_module/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: babelConfig
          },
          {
            loader: require.resolve('awesome-typescript-loader'),
            options: {
              configFileName: path.resolve(__dirname, './tsconfig.build.json')
            }
          }
        ]
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: babelConfig
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: { ...postcssConfig, sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })]
}
