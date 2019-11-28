#!/usr/bin/env node
const program = require('commander')
const colors = require('colors')
const gulp = require('gulp')
const execa = require('execa')
const path = require('path')
const package = require('./package.json')

const findGulpFile = __dirname
const gulpTask = require('./gulpfile')

program
  .version(package.version)
  .command('run <mode>')
  .description('build components mode cjs|esm|all')
  .action(async function(mode) {
    if (['cjs', 'esm', 'all'].includes(mode)) {
      try {
        gulpTask[mode].apply(gulp, [process.cwd(), false, path.join(process.cwd(), mode)])
        // execa.sync('gulp', [mode, '--cwd', `${__dirname}`]).stdout.pipe(process.stdout)
      } catch (e) {
        console.log(e)
      }
    } else {
      program.outputHelp((txt) => colors.red(txt))
    }
  })
// program.command('*').action(function(env) {
//   program.outputHelp((txt) => colors.red(txt))
// })
program.on('command:*', function() {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  )
  process.exit(1)
})
program.parse(process.argv)
