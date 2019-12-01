const path = require('path')
const fs = require('fs')
const browsersConfig = require('./browsersConfig')

module.exports = (context, cjs) => {
  const baseConfigFilePath = path.join(context, 'zhongyao.config.js')
  let babelConfig = { presets: [], plugins: [], env: {} }
  if (fs.existsSync(baseConfigFilePath)) {
    babelConfig = require(baseConfigFilePath)
  }
  const baseBabelConfig = {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        { modules: cjs !== 'cjs' ? false : 'commonjs', targets: { ...browsersConfig.browsers } }
      ]
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { useESModules: true }],
      '@babel/plugin-transform-object-assign',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread', { loose: true }]
    ]
  }
  return {
    presets: [...baseBabelConfig.presets, ...babelConfig.presets],
    plugins: [...baseBabelConfig.plugins, ...babelConfig.plugins],
    env: {
      ...babelConfig.env
    }
  }
}
