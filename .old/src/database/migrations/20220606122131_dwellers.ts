import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('dwellers', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.integer('lvl').notNullable();
    table.string('father');
    table.string('mother');
    table.integer('Strength').notNullable();
    table.integer('Perception').notNullable();
    table.integer('Endurance').notNullable();
    table.integer('Charisma').notNullable();
    table.integer('Intelligence').notNullable();
    table.integer('Agility').notNullable();
    table.integer('Luck').notNullable();
    table.dateTime('bornAt').defaultTo(knex.fn.now());
    table.dateTime('updateAt').defaultTo(knex.fn.now());

    table.index(
      [
        'id',
        'name',
        'Strength',
        'Perception',
        'Endurance',
        'Charisma',
        'Intelligence',
        'Agility',
        'Luck',
      ],
      'IDX_DWELLER',
    );
    table.index(['id', 'name', 'father'], 'IDX_DWELLER_FATHER');
    table.index(['id', 'name', 'mother'], 'IDX_DWELLER_MOTHER');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('dwellers');
}
