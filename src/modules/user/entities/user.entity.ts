import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  readonly id!: string
}
