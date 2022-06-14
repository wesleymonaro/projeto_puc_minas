import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ClassesTable1649262353796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'classes',
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
              name: 'weekDay',
              type: 'enum',
              isNullable: false,
              enum: ["1", "2", "3", "4", "5", "6", "7"]
            },
            {
              name: 'initHour',
              type: 'varchar',
              length: '5',
              isNullable: false,
            },
            {
              name: 'endHour',
              type: 'varchar',
              length: '5',
              isNullable: false,
            },
            {
              name: 'category',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'maxStudents',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'dojoId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'teacherId',
              type: 'int4',
              isNullable: true,
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
        'classes',
        new TableForeignKey({
          name: 'class_dojo',
          columnNames: ['dojoId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'dojos',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'classes',
        new TableForeignKey({
          name: 'class_teacher',
          columnNames: ['teacherId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'teachers',
          onDelete: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE classes;`);
    }

}
