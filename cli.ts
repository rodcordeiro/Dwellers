#!/usr/bin/env node

import { program } from 'commander';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import 'reflect-metadata';

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, './package.json'), 'utf8'),
);

import { AppDataSource } from './src/database.connection';

import Dweller from './src/commands/dweller';
import Building from './src/commands/build';
import Jobs from './src/commands/jobs';

AppDataSource.initialize()
  .then(() => {
    const cli = program;
    console.log(`${__dirname}/**/migrations/*.{ts,js}`);
    cli
      .version(pkg.version, '-v,--version', 'Shows cli version')
      .allowUnknownOption(false)
      .allowExcessArguments(false);

    cli.addCommand(Dweller);
    cli.addCommand(Building);
    cli.addCommand(Jobs);

    cli.parse(process.argv);
  })
  .catch((err) => {
    throw err;
  });
