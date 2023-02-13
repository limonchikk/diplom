import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserLoginUnique1676157819204 implements MigrationInterface {
    name = 'AddUserLoginUnique1676157819204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c"`);
    }

}
