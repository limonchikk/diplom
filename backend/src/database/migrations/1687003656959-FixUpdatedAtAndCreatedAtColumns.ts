import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixUpdatedAtAndCreatedAtColumns1687003656959 implements MigrationInterface {
  name = 'FixUpdatedAtAndCreatedAtColumns1687003656959'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "applications" ADD "created_at" TIMESTAMP WITH TIME ZONE`)
    await queryRunner.query(`COMMENT ON COLUMN "applications"."created_at" IS 'Created at date'`)
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "applications" ADD "updated_at" TIMESTAMP WITH TIME ZONE`)
    await queryRunner.query(`COMMENT ON COLUMN "applications"."updated_at" IS 'Updated at date'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "applications"."updated_at" IS 'Updated at date'`)
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "applications" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`)
    await queryRunner.query(`COMMENT ON COLUMN "applications"."created_at" IS 'Created at date'`)
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "applications" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`)
  }
}
