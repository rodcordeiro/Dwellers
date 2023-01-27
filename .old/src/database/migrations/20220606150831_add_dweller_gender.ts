import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('dwellers', (table) => {
    table.enum('gender', ['M', 'F']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('dwellers', (table) => {
    table.dropColumn('gender');
  });
}
