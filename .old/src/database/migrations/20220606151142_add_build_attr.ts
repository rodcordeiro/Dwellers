import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('build', (table) => {
    table.enum('attribute', ['S', 'P', 'E', 'C', 'I', 'A', 'L']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('build', (table) => {
    table.dropColumn('attribute');
  });
}
