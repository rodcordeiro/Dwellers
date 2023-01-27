import Table from "cli-table";
import { Dweller } from "./interface";

/** Renders a table with the dwellers data */
export function renderDwellers(data: Dweller[]) {
  const table = new Table({
    head: ["id", "Name", "lvl", "S", "P", "E", "C", "I", "A", "L", "Job"],
    colWidths: [10, 40, 5, 5, 5, 5, 5, 5, 5, 5, 20],
  });

  data.map((dweller) =>
    table.push([
      dweller.id!,
      dweller.name,
      String(dweller.lvl),
      String(dweller.Strength),
      String(dweller.Perception),
      String(dweller.Endurance),
      String(dweller.Charisma),
      String(dweller.Intelligence),
      String(dweller.Agility),
      String(dweller.Luck),
      dweller.job!,
    ])
  );

  return table.toString();
}
