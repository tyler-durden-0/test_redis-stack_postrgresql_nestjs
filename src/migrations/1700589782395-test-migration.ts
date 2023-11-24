import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigration1700589782395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists "user" (
          id                       serial4,
          name                varchar not null,
          password                 varchar not null,
          email                    varchar not null,
          status                   BOOLEAN DEFAULT false,
          primary key (id),
          unique(email)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
