import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplicantAndDocument1675724910343 implements MigrationInterface {
    name = 'AddApplicantAndDocument1675724910343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "base64" character varying NOT NULL, "type" "public"."documents_type_enum" NOT NULL, "applicantApplicantId" uuid, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id")); COMMENT ON COLUMN "documents"."id" IS 'Document''s unique identifier (system only)'; COMMENT ON COLUMN "documents"."base64" IS 'Document''s b64 value'; COMMENT ON COLUMN "documents"."type" IS 'Document type'; COMMENT ON COLUMN "documents"."applicantApplicantId" IS 'Applicant''s unique identifier'`);
        await queryRunner.query(`CREATE TABLE "applicants" ("applicant_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "sex" "public"."applicants_sex_enum" NOT NULL, "country" character varying NOT NULL, "birth_date" date NOT NULL, "residenceVisaAvalibility" boolean NOT NULL, "direction_of_study" "public"."applicants_direction_of_study_enum" NOT NULL, CONSTRAINT "UQ_cf1d183c497a68c4f07fe62d808" UNIQUE ("email"), CONSTRAINT "UQ_a61cbf54a8e2057eed4a0509257" UNIQUE ("phoneNumber"), CONSTRAINT "PK_584d58cca1c76a68c3ab0ee0904" PRIMARY KEY ("applicant_id")); COMMENT ON COLUMN "applicants"."applicant_id" IS 'Applicant''s unique identifier'; COMMENT ON COLUMN "applicants"."updated_at" IS 'Created at date'; COMMENT ON COLUMN "applicants"."name" IS 'Applicant''s name'; COMMENT ON COLUMN "applicants"."surname" IS 'Applicant''s surname'; COMMENT ON COLUMN "applicants"."email" IS 'Applicant''s email'; COMMENT ON COLUMN "applicants"."phoneNumber" IS 'Applicant''s phone number with WatsApp'; COMMENT ON COLUMN "applicants"."sex" IS 'Applicant''s sex'; COMMENT ON COLUMN "applicants"."country" IS 'Applicant''s country'; COMMENT ON COLUMN "applicants"."birth_date" IS 'Applicant''s birth date YYYY-MM-DD'; COMMENT ON COLUMN "applicants"."residenceVisaAvalibility" IS 'Applicant has residence visa'; COMMENT ON COLUMN "applicants"."direction_of_study" IS 'Applicant''s preferred direction of study'`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_fb0b6e4cace1b7744e574fa4e4b" FOREIGN KEY ("applicantApplicantId") REFERENCES "applicants"("applicant_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_fb0b6e4cace1b7744e574fa4e4b"`);
        await queryRunner.query(`DROP TABLE "applicants"`);
        await queryRunner.query(`DROP TABLE "documents"`);
    }

}
