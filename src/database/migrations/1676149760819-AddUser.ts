import { MigrationInterface, QueryRunner } from 'typeorm'
import { User } from '../../models'

import AppDataSource from '../ormconfig'

require('dotenv').config()

export class AddUser1676149760819 implements MigrationInterface {
  name = 'AddUser1676149760819'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin')`)
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'admin', CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")); COMMENT ON COLUMN "users"."user_id" IS 'User''s unique identifier'; COMMENT ON COLUMN "users"."login" IS 'Логин'; COMMENT ON COLUMN "users"."password" IS 'Хеш пароля'; COMMENT ON COLUMN "users"."role" IS 'Роль'`,
    )

    await queryRunner.commitTransaction().then(async () => {
      await queryRunner.startTransaction().then(async () => {
        const userRepository = AppDataSource.getRepository('users')
        const user = new User()
        user.login = process.env.DEFAULT_USER_LOGIN!
        user.password = process.env.DEFAULT_USER_PASSWORD!
        await userRepository.save(user)
      })
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`)
  }
}
