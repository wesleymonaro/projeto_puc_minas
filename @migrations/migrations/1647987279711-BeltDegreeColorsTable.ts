import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BeltDegreesTable1647987279711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'belt_degree_colors',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'tinyint',
            isNullable: false,
            default: 1,
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `INSERT INTO belt_degree_colors (name) VALUES('Branco')`,
    );
    await queryRunner.query(
      `INSERT INTO belt_degree_colors (name) VALUES('Vermelho')`,
    );
    await queryRunner.query(
      `INSERT INTO belt_degree_colors (name) VALUES('Cinza')`,
    );
    await queryRunner.query(
      `INSERT INTO belt_degree_colors (name) VALUES('Amarelo')`,
    );
    await queryRunner.query(
      `INSERT INTO belt_degree_colors (name) VALUES('Laranja')`,
    );
    await queryRunner.query(
      `INSERT INTO belt_degree_colors (name) VALUES('Verde')`,
    );
    await queryRunner.query(
      `INSERT INTO belt_degree_colors (name) VALUES('Azul')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE belt_degree_colors`);
  }
}
