import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PreferredDirectionOfStudy, ApplicantSex } from '../applicant.types'
import { Document } from '../../document/entities/document.entity'

@Entity({ name: 'applicants' })
export class Applicant {
  @PrimaryGeneratedColumn('uuid', {
    name: 'applicant_id',
    comment: "Applicant's unique identifier",
  })
  readonly applicantId!: string

  @CreateDateColumn({
    comment: 'Created at date',
    name: 'updated_at',
  })
  createdAt: Date

  @Column({
    comment: "Applicant's name",
  })
  name: string

  @Column({
    comment: "Applicant's surname",
  })
  surname: string

  @Column({
    comment: "Applicant's email",
    unique: true,
  })
  email: string

  @Column({
    comment: "Applicant's phone number with WatsApp",
    unique: true,
  })
  phoneNumber: string

  @Column({
    type: 'enum',
    enum: ApplicantSex,
    comment: "Applicant's sex",
  })
  sex: ApplicantSex

  @Column({
    comment: "Applicant's country",
  })
  country: string

  @Column('date', {
    name: 'birth_date',
    comment: "Applicant's birth date YYYY-MM-DD",
  })
  birthDate: Date

  @Column({
    comment: 'Applicant has residence visa',
  })
  residenceVisaAvalibility: boolean

  @Column({
    name: 'direction_of_study',
    type: 'enum',
    enum: PreferredDirectionOfStudy,
    comment: "Applicant's preferred direction of study",
  })
  preferredDirectionOfStudy: PreferredDirectionOfStudy

  @OneToMany(() => Document, (doc) => doc.applicant, { cascade: ['insert', 'remove'] })
  documents: Document[]
}
