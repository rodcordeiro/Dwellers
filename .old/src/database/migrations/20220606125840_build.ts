import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('build', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.integer('max_workers').defaultTo(2);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('build');
}
