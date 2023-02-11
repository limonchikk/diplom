import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserEmail1676156585217 implements MigrationInterface {
  name = 'AddUserEmail1676156585217'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying`)
    await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS 'Электронная почта'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS 'Электронная почта'`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`)
  }
}
