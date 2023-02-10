import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUniqueConstraintOnEmailAndPhone1676050221197 implements MigrationInterface {
    name = 'DropUniqueConstraintOnEmailAndPhone1676050221197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "UQ_ef282c002c2b46685ca2bbf6309"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "UQ_26ce735cc86620a0fcc88de9878"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "UQ_26ce735cc86620a0fcc88de9878" UNIQUE ("applicant_phone_number")`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "UQ_ef282c002c2b46685ca2bbf6309" UNIQUE ("applicant_email")`);
    }

}
