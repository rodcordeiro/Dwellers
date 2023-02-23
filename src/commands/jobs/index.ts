import { Command } from 'commander';
import { createPromptModule } from 'inquirer';
import chalk from 'chalk';
import { v4 as uuid } from 'uuid';
import { Spinner } from '../../utils';
import { BuildingService } from '../../services/building.service';
import { JobService } from '../../services/jobs.service';
import { DwellerService } from '../../services/dwellers.service';
import { Job } from '../../entities/Jobs';

const command = new Command('job');
const spinner = new Spinner().spinner;

command.helpOption('-h,--help', 'Dweller feature');
command.description('Job features. Allow view, create, update and delete jobs');
command.alias('j');

command
  .command('list')
  .alias('l')
  .description('View all buildings')
  .helpOption('-h,--help', 'Shows all buildings ')
  .option('--i, --id [job]', 'Filter by job id')
  .option('--p, --place [place]', 'Filter by place name')
  .action(async ({ id, place }: { id?: string; place?: string }) => {
    spinner.start('Hello Sir, requesting information...');
    const service = new JobService();
    let data: void | Job | Job[];
    if (id) {
      data = await service
        .findById(id)
        .then((response) => response)
        .catch((err: Error) => {
          spinner.fail(err.message);
          spinner.stop();
        });
    } else if (place) {
      data = await service
        .findByPlace(place)
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
    return;
  });

command
  .command('create')
  .alias('c')
  .description('Create a new build')
  .helpOption('-h,--help', 'Create a new build')
  .action(async () => {
    console.log(
      chalk.cyan(
        "Hello Sir, I see there is a new build today! Let's register it now",
      ),
    );
    const service = new JobService();
    const prompt = createPromptModule();
    const buildingList = await new BuildingService().list();

    const data = await prompt([
      {
        type: 'string',
        name: 'name',
        message: 'Job name:',
        validate: (input) => input !== '' && input !== undefined,
      },
      {
        type: 'list',
        name: 'place',
        message: 'Working place:',
        choices: buildingList.map((build) => build.name),
      },
    ]);

    spinner.start('Wait a moment, registering...');
    const _id = uuid();
    const payload = {
      ...data,
      place: buildingList.filter((build) => data.place === build.name)[0]._id,
      _id,
    };
    await service
      .register(payload)
      .then(() => {
        spinner.succeed(
          `New Job successfully registered! Job registration id: ${_id} `,
        );
        spinner.stop();
      })
      .catch((err: Error) => {
        console.error(err);
        spinner.fail(err.message);
        spinner.stop();
      });
    return;
  });

command
  .command('assign')
  .alias('a')
  .description('Assign a job to a dweller')
  .helpOption('-h,--help', 'Assign a job to a dweller')
  .option('--n, --name [dweller]', 'Filter by dweller name')
  .action(async ({ name }: { name?: string }) => {
    console.log(chalk.cyan("They're working hard, aren't they!?"));
    const service = new JobService();
    const dwellersService = new DwellerService();
    const prompt = createPromptModule();

    const jobs = await service.list();
    const dwellers = name
      ? await dwellersService.findByName(name)
      : await dwellersService.list();
    const dwellerSelected = name && dwellers.length === 1;
    const data = await prompt(
      dwellerSelected
        ? [
            {
              type: 'list',
              name: 'job',
              message: 'Select the new job:',
              choices: jobs.map((job) => job.name).sort(),
            },
          ]
        : [
            {
              type: 'list',
              name: 'dweller',
              message: 'Select the dweller:',
              choices: dwellers.map((dweller) => dweller.name),
            },
            {
              type: 'list',
              name: 'job',
              message: 'Select the new job:',
              choices: jobs.map((job) => job.name).sort(),
            },
          ],
    );

    spinner.start('Registration started sir!');
    const payload = {
      jobs: jobs.filter((job) => job.name === data.job)[0],
      dweller: dwellerSelected
        ? dwellers[0]
        : dwellers.filter((dweller) => dweller.name === data.dweller)[0],
    };
    await service
      .assing(payload.jobs, payload.dweller)
      .then(() => {
        spinner.succeed('This dweller will gonna be a great worker!');
        spinner.stop();
      })
      .catch((err: Error) => {
        spinner.fail(err.message);
        spinner.stop();
      });
  });

export default command;
