import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
// import { Spinner } from '../utils';
import Table from 'cli-table';
import { IDweller, Dweller } from '../services';
import { copyFileSync } from 'fs';

const showDwellers = (data: any[]) => {
  const table = new Table({
    head: ['id', 'Name', 'lvl', 'S', 'P', 'E', 'C', 'I', 'A', 'L', 'Job'],
    colWidths: [10, 40, 5, 5, 5, 5, 5, 5, 5, 5, 20],
  });
  data.map((dweller: IDweller) =>
    table.push([
      dweller.id,
      dweller.name,
      dweller.lvl,
      dweller.Strength,
      dweller.Perception,
      dweller.Endurance,
      dweller.Charisma,
      dweller.Intelligence,
      dweller.Agility,
      dweller.Luck,
      dweller.job,
    ]),
  );
  console.log(table.toString());
};

// const spinner = new Spinner().spinner;

const command = new Command('Dweller');
command.helpOption('-h,--help', 'Dweller feature');
command.description(
  'Dwellers features. Allow view, create, update and delete dwellers',
);
command.alias('d');

command
  .command('List')
  .alias('l')
  .description('View all dwellers')
  .helpOption('-h,--help', 'Shows all dwellers')
  .action(async () => {
    // spinner.start('Hello Sir, requesting information...');
    const service = new Dweller();
    await service.view().then((response) => {
      // spinner.succeed('Here are your dwellers Sir!');
      // spinner.stop();
      showDwellers(response);
      service.close();
    });
  });

command
  .command('Create')
  .alias('c')
  .description('Create a new dweller')
  .helpOption('-h,--help', 'Shows all dwellers')
  .action(async () => {
    console.log(
      // chalk.cyan(
      "Hello Sir, I see there is a new dweller today! Let's register him now",
      // ),
    );
    const service = new Dweller();
    const data = await inquirer.prompt([
      {
        type: 'string',
        name: 'name',
        message: 'Dweller name:',
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
      const dwellers = await service.getDwellers().then((response) => response);
      const { father, mother } = await inquirer.prompt([
        {
          type: 'list',
          name: 'father',
          message: 'Who is the father?',
          choices: dwellers
            .filter((dweller) => dweller.gender === 'M')
            .map((dweller) => dweller.name),
        },
        {
          type: 'list',
          name: 'mother',
          message: 'Who is the mother?',
          choices: dwellers.filter((dweller) => dweller.gender === 'F'),
        },
      ]);
      return await service
        .create(
          data.name,
          data.lvl,
          data.gender,
          data.Strength,
          data.Perception,
          data.Endurance,
          data.Charisma,
          data.Intelligence,
          data.Agility,
          data.Luck,
          new Date().toISOString(),
          dwellers.filter((dweller) => dweller.name === father)[0].id,
          dwellers.filter((dweller) => dweller.name === mother)[0].id,
        )
        .then((response: any) => {
          const table = new Table({
            head: ['id', 'Name'],
            colWidths: [10, 40],
          });
          table.push([response.id, response.name]);
          console.log(table.toString());
        });
    }
    return await service
      .create(
        data.name,
        data.lvl,
        data.gender,
        data.Strength,
        data.Perception,
        data.Endurance,
        data.Charisma,
        data.Intelligence,
        data.Agility,
        data.Luck,
        new Date().toISOString(),
      )
      .then((response: any) => {
        const table = new Table({
          head: ['id', 'Name'],
          colWidths: [10, 40],
        });
        table.push([response.id, response.name]);
        console.log(table.toString());
      });
  });

export default command;
