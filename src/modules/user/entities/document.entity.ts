import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserDocumentType } from '../user.types'
import { User } from './user.entity'

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: "Document's unique identifier (system only)",
  })
  readonly id!: string

  @PrimaryGeneratedColumn({
    name: 'document_id',
    comment: "Document's identifier",
  })
  readonly documentId!: string

  @Column({
    type: 'enum',
    enum: UserDocumentType,
    comment: 'Document type',
  })
  readonly type!: UserDocumentType

  @ManyToOne(() => User, (user) => user.documents)
  readonly user!: UserDocumentType
}
