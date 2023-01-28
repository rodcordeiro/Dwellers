#!/usr/bin/env node

import program from 'commander';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
// import { UpdateNotifier } from 'update-notifier';

import Dweller from './src/commands/dweller';

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, './package.json'), 'utf8'),
);

// const notifier = new UpdateNotifier({ pkg, shouldNotifyInNpmScript: true });
// notifier.fetchInfo();
// if (notifier.update) {
//   console.log(`Update available: ${notifier.update.latest}`);
// }

// console.log(process.env.DEBUG);
const cli = program.program;

cli.addCommand(Dweller);

cli
  .version(pkg.version, '-v,--version', 'Shows cli version')
  .allowUnknownOption(false)
  .allowExcessArguments(false);

cli.parse(process.argv);
