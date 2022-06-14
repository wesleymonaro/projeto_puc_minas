import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UsersTable1648687495158 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'users',
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
              name: 'email',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'dojoId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'role',
              type: 'enum',
              isNullable: false,
              enum: ["master", "dojo_admin", "teacher", "student"]
            },
            {
              name: 'active',
              type: 'tinyint',
              isNullable: false,
              default: 1,
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              isNullable: false,
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              isNullable: true,
              default: 'now()',
            },
          ],
        }),
        true,
      );

      await queryRunner.createForeignKey(
        'users',
        new TableForeignKey({
          name: 'user_dojo',
          columnNames: ['dojoId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'dojos',
          onDelete: 'CASCADE',
        }),
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }

}
