import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BeltsTable1647984852258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'belts',
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
      `INSERT INTO belts (name) VALUES('Infantil Faixa Branca')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Cinza / Branca')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Cinza')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Cinza / Preta')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Amarela / Branca')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Amarela')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Amarela / Preta')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Laranja / Branca')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Laranja')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Laranja / Preta')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Verde / Branca')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Verde')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Verde / Preta')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Infantil Faixa Azul')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Adulto Faixa Branca')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Adulto Faixa Azul')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Adulto Faixa Roxa')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Adulto Faixa Marrom')`,
    );
    await queryRunner.query(
      `INSERT INTO belts (name) VALUES('Adulto Faixa Preta')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE belts`);
  }
}
