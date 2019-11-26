#!/usr/bin/env node
const program = require('commander')
const colors = require('colors')
const package = require('./package.json')
const matchDirname = (name) => {
  if (['esm', 'cjs'].includes(name)) {
    return name
  } else {
    program.outputHelp(() => colors.red('relative root a output dir name, but only esm|cjs'))
  }
}
program
  .version(package.version)
  .option(
    '-o, --output <output>',
    'relative root a output dir name, but only esm|cjs',
    matchDirname
  )
  .option('-m, --use-module <module>', 'babel use module to complie')
  .parse(process.argv)
const { output, useModule } = program
