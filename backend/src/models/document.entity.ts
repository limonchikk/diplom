import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Application } from './application.entity'

export enum ApplicantDocumentType {
  passportOriginal = 'passport_original',
  russianPassport = 'russian_passport',
  educationDocumentOriginal = 'education_document_original',
  russianEducationDocument = 'russian_education_document',
}

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
    nullable: false,
  })
  documentId!: string

  @Column({
    type: 'enum',
    enum: ApplicantDocumentType,
    comment: 'Document type',
    nullable: false,
  })
  type!: ApplicantDocumentType

  @Column({
    comment: 'Document mimtype',
    nullable: false,
  })
  mimetype!: string

  @ManyToOne(() => Application, (applicant) => applicant.documents)
  @JoinColumn({ name: 'application' })
  application!: Application
}
