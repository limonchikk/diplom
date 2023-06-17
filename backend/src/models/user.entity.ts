import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import * as argon2 from 'argon2'
import { Exclude } from 'class-transformer'

export enum Role {
  Admin = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
    comment: "User's unique identifier",
  })
  readonly userId!: string

  @Column({
    comment: 'Логин',
    nullable: false,
    unique: true,
  })
  login: string

  @Column({
    comment: 'Хеш пароля',
    nullable: false,
  })
  @Exclude()
  password!: string

  @Column({
    comment: 'Электронная почта',
    nullable: true,
  })
  email!: string

  @Column('enum', {
    comment: 'Роль',
    enum: Role,
    default: Role.Admin,
    nullable: false,
  })
  readonly role?: string

  @BeforeInsert()
  private async hashPassword() {
    const hashedPassword = await argon2.hash(this.password)
    this.password = hashedPassword
  }
}
