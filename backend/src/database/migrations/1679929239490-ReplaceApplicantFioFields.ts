import { MigrationInterface, QueryRunner } from 'typeorm'

export class ReplaceApplicantFioFields1679929239490 implements MigrationInterface {
  name = 'ReplaceApplicantFioFields1679929239490'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicant_name"`)
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicant_surname"`)
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicant_patronymic"`)
    await queryRunner.query(`ALTER TABLE "applications" ADD "applicant_fio" character varying NOT NULL`)
    await queryRunner.query(`COMMENT ON COLUMN "applications"."applicant_fio" IS 'Applicant''s fio'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "applications"."applicant_fio" IS 'Applicant''s fio'`)
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicant_fio"`)
    await queryRunner.query(`ALTER TABLE "applications" ADD "applicant_patronymic" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "applications" ADD "applicant_surname" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "applications" ADD "applicant_name" character varying NOT NULL`)
  }
}
