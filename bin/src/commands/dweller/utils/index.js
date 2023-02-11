// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import Table from 'cli-table';
// import { Dweller } from '../../../entities/Dweller';
// /** Renders a table with the dwellers data */
// export function renderDwellers(data: Dweller[]) {
//   //   console.log(data);
//   const table: Table = new Table({
//     head: ['id', 'Name', 'lvl', 'S', 'P', 'E', 'C', 'I', 'A', 'L', 'Job'],
//     colWidths: [45, 40, 5, 5, 5, 5, 5, 5, 5, 5, 20],
//   });
//   if (Array.isArray(data)) {
//     data.map((dweller) =>
//       table.push([
//         dweller._id,
//         dweller.name,
//         dweller.lvl,
//         dweller.Strength,
//         dweller.Perception,
//         dweller.Endurance,
//         dweller.Charisma,
//         dweller.Intelligence,
//         dweller.Agility,
//         dweller.Luck,
//         dweller.job,
//       ]),
//     );
//   } else {
//     table.push(data);
//   }
//   return table;
// }
//# sourceMappingURL=index.js.map