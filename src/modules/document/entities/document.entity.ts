import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApplicantDocumentType } from '../../applicant/applicant.types'
import { Applicant } from '../../applicant/entities/applicant.entity'

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: "Document's unique identifier (system only)",
  })
  readonly id!: string

  @Column({
    name: 'base64',
    comment: "Document's b64 value",
  })
  base64!: string

  @Column({
    type: 'enum',
    enum: ApplicantDocumentType,
    comment: 'Document type',
  })
  type!: ApplicantDocumentType

  @ManyToOne(() => Applicant, (applicant) => applicant.documents)
  readonly applicant!: ApplicantDocumentType
}
