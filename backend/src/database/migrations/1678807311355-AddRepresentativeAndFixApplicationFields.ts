import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRepresentativeAndFixApplicationFields1678807311355 implements MigrationInterface {
    name = 'AddRepresentativeAndFixApplicationFields1678807311355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicant_country"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "applicant_patronymic" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "applications"."applicant_patronymic" IS 'Applicant''s patronymic'`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "applicant_registration_country" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "applications"."applicant_registration_country" IS 'Applicant''s registration country'`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "applicant_living_country" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "applications"."applicant_living_country" IS 'Applicant''s living country'`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "representative" jsonb`);
        await queryRunner.query(`COMMENT ON COLUMN "applications"."representative" IS 'Applicant representative'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "applications"."representative" IS 'Applicant representative'`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "representative"`);
        await queryRunner.query(`COMMENT ON COLUMN "applications"."applicant_living_country" IS 'Applicant''s living country'`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicant_living_country"`);
        await queryRunner.query(`COMMENT ON COLUMN "applications"."applicant_registration_country" IS 'Applicant''s registration country'`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicant_registration_country"`);
        await queryRunner.query(`COMMENT ON COLUMN "applications"."applicant_patronymic" IS 'Applicant''s patronymic'`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicant_patronymic"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "applicant_country" character varying NOT NULL`);
    }

}
