import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddApplicationAndDocument1676153871244 implements MigrationInterface {
  name = 'AddApplicationAndDocument1676153871244'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."documents_type_enum" AS ENUM('passport_original', 'russian_passport', 'education_document_original', 'russian_education_document')`,
    )
    await queryRunner.query(
      `CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document_id" uuid NOT NULL, "type" "public"."documents_type_enum" NOT NULL, "applicationApplicationId" uuid, CONSTRAINT "UQ_bec3c89789f76e330bbe1766b2c" UNIQUE ("document_id"), CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id")); COMMENT ON COLUMN "documents"."id" IS 'Document''s unique identifier (system only)'; COMMENT ON COLUMN "documents"."document_id" IS 'Document''s unique identifier'; COMMENT ON COLUMN "documents"."type" IS 'Document type'; COMMENT ON COLUMN "documents"."applicationApplicationId" IS 'Application''s unique identifier'`,
    )
    await queryRunner.query(`CREATE TYPE "public"."applications_applicant_sex_enum" AS ENUM('male', 'female')`)
    await queryRunner.query(`CREATE TYPE "public"."applications_applicant_preferred_direction_of_study_enum" AS ENUM('technical', 'medical')`)
    await queryRunner.query(
      `CREATE TABLE "applications" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "application_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "applicant_name" character varying NOT NULL, "applicant_surname" character varying NOT NULL, "applicant_email" character varying NOT NULL, "applicant_phone_number" character varying NOT NULL, "applicant_sex" "public"."applications_applicant_sex_enum" NOT NULL, "applicant_country" character varying NOT NULL, "applicant_birth_date" date NOT NULL, "applicant_residence_visa_avalibility" boolean NOT NULL, "applicant_preferred_direction_of_study" "public"."applications_applicant_preferred_direction_of_study_enum" NOT NULL, "viewed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_418038704e50c663590feb7f511" PRIMARY KEY ("application_id")); COMMENT ON COLUMN "applications"."created_at" IS 'Created at date'; COMMENT ON COLUMN "applications"."updated_at" IS 'Updated at date'; COMMENT ON COLUMN "applications"."application_id" IS 'Application''s unique identifier'; COMMENT ON COLUMN "applications"."applicant_name" IS 'Applicant''s name'; COMMENT ON COLUMN "applications"."applicant_surname" IS 'Applicant''s surname'; COMMENT ON COLUMN "applications"."applicant_email" IS 'Applicant''s email'; COMMENT ON COLUMN "applications"."applicant_phone_number" IS 'Applicant''s phone number with WatsApp'; COMMENT ON COLUMN "applications"."applicant_sex" IS 'Applicant''s sex'; COMMENT ON COLUMN "applications"."applicant_country" IS 'Applicant''s country'; COMMENT ON COLUMN "applications"."applicant_birth_date" IS 'Applicant''s birth date YYYY-MM-DD'; COMMENT ON COLUMN "applications"."applicant_residence_visa_avalibility" IS 'Applicant has residence visa'; COMMENT ON COLUMN "applications"."applicant_preferred_direction_of_study" IS 'Applicant''s preferred direction of study'; COMMENT ON COLUMN "applications"."viewed" IS 'Application is viewed by admin user'`,
    )
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_7a5dcbe1041b7b9b708eb97ea51" FOREIGN KEY ("applicationApplicationId") REFERENCES "applications"("application_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_7a5dcbe1041b7b9b708eb97ea51"`)
    await queryRunner.query(`DROP TABLE "applications"`)
    await queryRunner.query(`DROP TYPE "public"."applications_applicant_preferred_direction_of_study_enum"`)
    await queryRunner.query(`DROP TYPE "public"."applications_applicant_sex_enum"`)
    await queryRunner.query(`DROP TABLE "documents"`)
    await queryRunner.query(`DROP TYPE "public"."documents_type_enum"`)
  }
}
