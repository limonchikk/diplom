import { MigrationInterface, QueryRunner } from 'typeorm'

export class DocumentFix1678813992145 implements MigrationInterface {
  name = 'DocumentFix1678813992145'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_7a5dcbe1041b7b9b708eb97ea51"`)
    await queryRunner.query(`ALTER TABLE "documents" RENAME COLUMN "applicationApplicationId" TO "application"`)
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_3bebc8f2687c7615ec0bbc035f3" FOREIGN KEY ("application") REFERENCES "applications"("application_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_3bebc8f2687c7615ec0bbc035f3"`)
    await queryRunner.query(`ALTER TABLE "documents" RENAME COLUMN "application" TO "applicationApplicationId"`)
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_7a5dcbe1041b7b9b708eb97ea51" FOREIGN KEY ("applicationApplicationId") REFERENCES "applications"("application_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
