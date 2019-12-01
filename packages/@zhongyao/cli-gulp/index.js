#!/usr/bin/env node
const program = require('commander')
const colors = require('colors')
const gulp = require('gulp')
const log = require('fancy-log')
const package = require('./package.json')

const gulpTask = require('./gulpfile/index')

program
  .version(package.version)
  .command('run <mode>')
  .description('build components mode cjs|es|all')
  .action((mode) => {
    if (['cjs', 'esm', 'all'].includes(mode)) {
      try {
        gulpTask[mode].apply(gulp, [mode])
        // execa.sync('gulp', [mode, '--cwd', `${__dirname}`]).stdout.pipe(process.stdout)
      } catch (e) {
        log.error(e)
      }
    } else {
      program.outputHelp((txt) => colors.red(txt))
    }
  })
// program.command('*').action(function(env) {
//   program.outputHelp((txt) => colors.red(txt))
// })
program.on('command:*', () => {
  log.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  )
  process.exit(1)
})
program.parse(process.argv)
