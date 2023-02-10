import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApplicantDocumentType } from '../application.types'
import { Application } from './application.entity'

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: "Document's unique identifier (system only)",
  })
  readonly id!: string

  @Column('uuid', {
    name: 'document_id',
    comment: "Document's unique identifier",
    unique: true,
  })
  documentId!: string

  @Column({
    type: 'enum',
    enum: ApplicantDocumentType,
    comment: 'Document type',
  })
  type!: ApplicantDocumentType

  @ManyToOne(() => Application, (applicant) => applicant.documents)
  application!: Application
}
