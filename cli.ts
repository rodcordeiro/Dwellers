#!/usr/bin/env node

import { program } from 'commander';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
// import { UpdateNotifier } from 'update-notifier';

const __filename = fileURLToPath(import.meta.url);
const _currentdir = dirname(__filename);

import Dweller from './src/commands/dweller/index.js';

const pkg = JSON.parse(
  readFileSync(resolve(_currentdir, './package.json'), 'utf8'),
);

// const notifier = new UpdateNotifier({ pkg, shouldNotifyInNpmScript: true });
// notifier.fetchInfo();
// if (notifier.update) {
//   console.log(`Update available: ${notifier.update.latest}`);
// }

// console.log(process.env.DEBUG);
const cli = program;

cli.addCommand(Dweller);

cli
  .version(pkg.version, '-v,--version', 'Shows cli version')
  .allowUnknownOption(false)
  .allowExcessArguments(false);

cli.parse(process.argv);
