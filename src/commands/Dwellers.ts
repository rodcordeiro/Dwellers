import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
// import { Spinner } from '../utils';
import Table from 'cli-table';
import { IDweller, Dweller } from '../services';

const showTodoTable = (data: any[]) => {
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
      showTodoTable(response);
      service.close();
    });
  });

export default command;
