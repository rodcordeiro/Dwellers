import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import Spinner from '../utils';

const spinner = new Spinner().spinner;

const command = new Command('Dweller');
command.helpOption('-h,--help', 'Dweller feature');
command.description(
  'Dwellers features. Allow view, create, update and delete dwellers',
);

export default command;
