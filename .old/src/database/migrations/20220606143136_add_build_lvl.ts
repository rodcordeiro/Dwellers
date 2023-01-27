import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('build', (table) => {
    table.integer('lvl').defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('build', (table) => {
    table.dropColumn('lvl');
  });
}
