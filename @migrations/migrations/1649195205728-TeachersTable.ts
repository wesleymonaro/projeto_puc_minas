import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UsersTable1649195205727 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'teachers',
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
              name: 'dojoId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'userId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'beltId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'beltDegreeColorId',
              type: 'int4',
              isNullable: false,
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
        'teachers',
        new TableForeignKey({
          name: 'teacher_belt_degree_color',
          columnNames: ['beltDegreeColorId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'belt_degree_colors',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'teachers',
        new TableForeignKey({
          name: 'teacher_belt',
          columnNames: ['beltId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'belts',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'teachers',
        new TableForeignKey({
          name: 'teacher_dojo',
          columnNames: ['dojoId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'dojos',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'teachers',
        new TableForeignKey({
          name: 'teacher_user',
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
        }),
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE teachers`);
  }

}
