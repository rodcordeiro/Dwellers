import { Command } from 'commander';
import { createPromptModule } from 'inquirer';
import chalk from 'chalk';
import { v4 as uuid } from 'uuid';
import { Spinner } from '../../utils';
import { DwellerService } from '../../services/dwellers.service';
import { Dweller } from '../../entities/Dweller';
// import { renderDwellers } from './utils';

interface iFilterParams {
  id?: string;
  name?: string;
}

const command = new Command('dweller');
const spinner = new Spinner().spinner;

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
  .option('--n, --name [dweller]', 'Filter dby dweller name')
  .action(async ({ id, name }: iFilterParams) => {
    spinner.start('Hello Sir, requesting information...');
    const service = new DwellerService();
    let data: void | Dweller | Dweller[];
    if (id) {
      data = await service
        .findById(id)
        .then((response) => response)
        .catch((err: Error) => {
          spinner.fail(err.message);
          spinner.stop();
        });
    } else if (name) {
      data = await service
        .findByName(name)
        .then((response) => response)
        .catch((err: Error) => {
          spinner.fail(err.message);
          spinner.stop();
        });
    } else {
      data = await service
        .list()
        .then((response) => response)
        .catch((err: Error) => {
          spinner.fail(err.message);
          spinner.stop();
        });
    }

    spinner.succeed('Here are your dwellers Sir!');
    spinner.stop();

    console.table(data);
    // console.table(renderDwellers(data));
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
        validate: (input: number) => !isNaN(input),
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
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Perception',
        message: 'Dweller Perception:',
        default: 1,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Endurance',
        message: 'Dweller Endurance:',
        default: 1,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Charisma',
        message: 'Dweller Charisma:',
        default: 1,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Intelligence',
        message: 'Dweller Intelligence:',
        default: 1,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Agility',
        message: 'Dweller Agility:',
        default: 1,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Luck',
        message: 'Dweller Luck:',
        default: 1,
        validate: (input: number) => !isNaN(input),
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
      data.father = men.filter((dweller) => dweller.name === father)[0]._id;
      data.mother = women.filter((dweller) => dweller.name === mother)[0]._id;
    }

    spinner.start('Wait a moment, registering...');
    const _id = uuid();
    await service
      .register({
        ...data,
        _id,
      })
      .then(() => {
        spinner.succeed(
          `New dweller successfully created! Dweller ${data.name} has received the ${_id} identifier`,
        );
        spinner.stop();
      })
      .catch((err: Error) => {
        spinner.fail(err.message);
        spinner.stop();
      });
    return;
  });

command
  .command('update')
  .alias('u')
  .description('Update a  dweller')
  .option('--n, --name [dweller]', 'Filter dby dweller name')
  .helpOption('-h,--help', 'Update dweller')
  .action(async ({ name }: iFilterParams) => {
    const service = new DwellerService();
    const prompt = createPromptModule();
    let dweller: Dweller;

    if (name) {
      dweller = await service.findByName(name);
    } else {
      const list = await service.list();
      const { selected } = await prompt([
        {
          type: 'list',
          name: 'selected',
          message: 'Who bring us some news?',
          choices: list.map((dweller) => dweller.name),
        },
      ]);
      dweller = list.find((d) => d.name === selected);
    }
    const data = await prompt([
      {
        type: 'number',
        name: 'lvl',
        message: 'Dweller lvl:',
        default: dweller.lvl,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Strength',
        message: 'Dweller Strength:',
        default: dweller.Strength,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Perception',
        message: 'Dweller Perception:',
        default: dweller.Perception,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Endurance',
        message: 'Dweller Endurance:',
        default: dweller.Endurance,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Charisma',
        message: 'Dweller Charisma:',
        default: dweller.Charisma,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Intelligence',
        message: 'Dweller Intelligence:',
        default: dweller.Intelligence,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Agility',
        message: 'Dweller Agility:',
        default: dweller.Agility,
        validate: (input: number) => !isNaN(input),
      },
      {
        type: 'number',
        name: 'Luck',
        message: 'Dweller Luck:',
        default: dweller.Luck,
        validate: (input: number) => !isNaN(input),
      },
    ]);

    spinner.start(`Alright, let's update ${dweller.name} information!`);
    await service
      .update({
        ...dweller,
        ...data,
      })
      .then(() => {
        spinner.succeed('Information updated!');
        spinner.stop();
      })
      .catch((err: Error) => {
        spinner.fail(err.message);
        spinner.stop();
      });
  });

command
  .command('delete')
  .alias('d')
  .description('Delete a  dweller')
  .option('--n, --name [dweller]', 'Filter dby dweller name')
  .helpOption('-h,--help', 'Delete a dweller')
  .action(async ({ name }: iFilterParams) => {
    const service = new DwellerService();
    const prompt = createPromptModule();
    let dweller: Dweller;

    if (name) {
      dweller = await service.findByName(name);
    } else {
      const list = await service.list();
      const { selected } = await prompt([
        {
          type: 'list',
          name: 'selected',
          message: 'Who has gone to the star, sir?',
          choices: list.map((dweller) => dweller.name),
        },
      ]);
      dweller = list.find((d) => d.name === selected);
    }
    spinner.start(`Alright, let's update ${dweller.name} information!`);
    await service
      .delete(dweller)
      .then(() => {
        spinner.succeed(
          `The funeral has begun. ${
            dweller.gender === 'F' ? 'Sh' : 'H'
          }e will be remembered with honor!`,
        );
        spinner.stop();
      })
      .catch((err: Error) => {
        spinner.fail(err.message);
        spinner.stop();
      });
  });

export default command;
