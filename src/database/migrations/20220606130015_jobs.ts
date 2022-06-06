import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('job', (table) => {
    table.increments('id', { primaryKey: true });
    table.string('name').notNullable();
    table.string('place').notNullable();
    table
      .foreign('place')
      .references('build.id')
      .onUpdate('SET NULL')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('job');
}
