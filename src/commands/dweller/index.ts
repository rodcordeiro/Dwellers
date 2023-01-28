import { Command } from 'commander';
import { createPromptModule } from 'inquirer';
import chalk from 'chalk';
import { DwellerService } from '../../services/dwellers.service.js';
import { renderDwellers } from './utils/index.js';
import { Spinner } from '../../utils/index.js';

const spinner = new Spinner().spinner;

const command = new Command('dweller');
command.helpOption('-h,--help', 'Dweller feature');
command.description(
  'Dwellers features. Allow view, create, update and delete dwellers',
);
command.alias('d');

command
  .command('list')
  .alias('l')
  .description('View all dwellers')
  .helpOption('-h,--help', 'Shows all dwellers')
  .option('--i, --id [dweller]', 'Filter dby dweller id')
  .action(async ({ id }: { id?: string }) => {
    spinner.start('Hello Sir, requesting information...');

    const service = new DwellerService();
    const data = await service.view({ id }).then((response) => response);

    spinner.succeed('Here are your dwellers Sir!');
    spinner.stop();

    console.table(renderDwellers(data));
    return;
  });

command
  .command('create')
  .alias('c')
  .description('Create a new dweller')
  .helpOption('-h,--help', 'Create a new dweller')
  .action(async () => {
    console.log(
      chalk.cyan(
        "Hello Sir, I see there is a new dweller today! Let's register him now",
      ),
    );
    const service = new DwellerService();
    const prompt = createPromptModule();

    const data = await prompt([
      {
        type: 'string',
        name: 'name',
        message: 'Dweller name:',
        validate: (input) => input !== '' && input !== undefined,
      },
      {
        type: 'number',
        name: 'lvl',
        message: 'Dweller lvl:',
        default: 1,
        validate: (input) => !isNaN(input),
      },
      {
        type: 'list',
        name: 'gender',
        message: 'Dweller gender:',
        choices: ['F', 'M'],
      },

      {
        type: 'number',
        name: 'Strength',
        message: 'Dweller Strength:',
        default: 1,
        validate: (input) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Perception',
        message: 'Dweller Perception:',
        default: 1,
        validate: (input) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Endurance',
        message: 'Dweller Endurance:',
        default: 1,
        validate: (input) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Charisma',
        message: 'Dweller Charisma:',
        default: 1,
        validate: (input) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Intelligence',
        message: 'Dweller Intelligence:',
        default: 1,
        validate: (input) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Agility',
        message: 'Dweller Agility:',
        default: 1,
        validate: (input) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Luck',
        message: 'Dweller Luck:',
        default: 1,
        validate: (input) => !isNaN(input),
      },
      {
        type: 'list',
        name: 'vaultKid',
        message: 'Does the dweller are born in our vault?',
        choices: ['Yes', 'No'],
      },
    ]);
    if (data.vaultKid === 'Yes') {
      const [men, women] = await Promise.all([
        service.getMale().then((response) => response),
        service.getFemale().then((response) => response),
      ]);
      const { father, mother } = await prompt([
        {
          type: 'list',
          name: 'father',
          message: 'Who is the father?',
          choices: men.map((dweller) => dweller.name),
        },
        {
          type: 'list',
          name: 'mother',
          message: 'Who is the mother?',
          choices: women.map((dweller) => dweller.name),
        },
      ]);
      data.father = men.filter((dweller) => dweller.name === father)[0].id;
      data.mother = women.filter((dweller) => dweller.name === mother)[0].id;
    }
    spinner.start('Wait a moment, registering...');
    // console.log({ data });
    await service
      .create(data)
      .then((response) => {
        spinner.succeed(
          `New dweller successfully created! Dweller ${data.name} has received the ${response.id} identifier`,
        );
        spinner.stop();
      })
      .catch((err: Error) => {
        spinner.fail(err.message);
        spinner.stop();
      })
      .finally(() => service.close());
    return;
  });

export default command;