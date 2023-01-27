import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { DwellerService } from "../services/dwellers.service";
import { Dweller } from "../utils/interface";
import { renderDwellers } from "../utils/dwellers";

const command = new Command("dweller");
command.helpOption("-h,--help", "Dweller feature");
command.description(
  "Dwellers features. Allow view, create, update and delete dwellers"
);
command.alias("d");

command
  .command("List")
  .alias("l")
  .description("View all dwellers")
  .helpOption("-h,--help", "Shows all dwellers")
  .action(async () => {
    // spinner.start('Hello Sir, requesting information...');
    const service = new DwellerService();
    await service.view().then((response) => {
      // spinner.succeed('Here are your dwellers Sir!');
      // spinner.stop();

      console.table(renderDwellers(response));
      return;
    });
  });

export default command;
