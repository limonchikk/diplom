import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

@Entity()
export class Auditable {
  @CreateDateColumn({
    comment: 'Created at date',
    name: 'created_at',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: 'Updated at date',
    name: 'updated_at',
  })
  updatedAt: Date
}
