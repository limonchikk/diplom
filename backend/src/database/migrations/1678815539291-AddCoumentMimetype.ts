import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoumentMimetype1678815539291 implements MigrationInterface {
    name = 'AddCoumentMimetype1678815539291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "mimetype" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "documents"."mimetype" IS 'Document mimtype'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "documents"."mimetype" IS 'Document mimtype'`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "mimetype"`);
    }

}
