import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class StudentsTable1648687495358 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
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
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'birthdate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'paymentDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'observations',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'notifyDueDate',
            type: 'tinyint',
            isNullable: false,
            default: 1,
          },
          {
            name: 'startsFightAt',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'tinyint',
            isNullable: false,
            default: 1,
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
            name: 'addressId',
            type: 'int4',
            isNullable: true,
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
            name: 'planId',
            type: 'int4',
            isNullable: true,
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
      'students',
      new TableForeignKey({
        name: 'students_address',
        columnNames: ['addressId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'addresses',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        name: 'student_belt_degree_color',
        columnNames: ['beltDegreeColorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'belt_degree_colors',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        name: 'student_belt',
        columnNames: ['beltId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'belts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        name: 'student_dojo',
        columnNames: ['dojoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dojos',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        name: 'students_user',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE students`);
  }
}
