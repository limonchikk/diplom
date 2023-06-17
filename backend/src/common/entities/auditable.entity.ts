import { Column, Entity } from 'typeorm'

@Entity()
export class Auditable {
  @Column({
    comment: 'Created at date',
    name: 'created_at',
    type: 'timestamptz',
    nullable: true,
  })
  createdAt: Date

  @Column({
    comment: 'Updated at date',
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt: Date
}
