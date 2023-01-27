import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('assignment', (table) => {
    table.increments('id', { primaryKey: true });
    table.string('dweller').notNullable();
    table.string('job').notNullable();
    table
      .foreign('dweller')
      .references('dwellers.id')
      .onUpdate('SET NULL')
      .onDelete('SET NULL');
    table
      .foreign('job')
      .references('job.id')
      .onUpdate('SET NULL')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('assignment');
}
