import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class PresencesTable1649262903832 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'presences',
          columns: [
            {
              name: 'id',
              type: 'int4',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },

            {
              name: 'dojoId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'studentId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'classId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'confirmedByUserId',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'status',
              type: 'tinyint',
              isNullable: false,
              default: 2,
            },
            {
              name: 'date',
              type: 'date',
              isNullable: false,
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

      // await queryRunner.createForeignKey(
      //   'presences',
      //   new TableForeignKey({
      //     name: 'presence_confirmated_by_user_id',
      //     columnNames: ['confirmedByUserId'],
      //     referencedColumnNames: ['id'],
      //     referencedTableName: 'users',
      //     onDelete: 'CASCADE',
      //   }),
      // );

      await queryRunner.createForeignKey(
        'presences',
        new TableForeignKey({
          name: 'presence_dojo',
          columnNames: ['dojoId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'dojos',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'presences',
        new TableForeignKey({
          name: 'presence_student',
          columnNames: ['studentId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'students',
          onDelete: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE presences;`);
    }

}
