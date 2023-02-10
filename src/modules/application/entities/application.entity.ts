import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Auditable } from '../../common/entities/auditable.entity'
import { ApplicantSex, PreferredDirectionOfStudy } from '../application.types'
import { Document } from './document.entity'

@Entity({ name: 'applications' })
export class Application extends Auditable {
  @PrimaryGeneratedColumn('uuid', {
    name: 'application_id',
    comment: "Application's unique identifier",
  })
  readonly applicationId!: string

  @Column({
    name: 'applicant_name',
    comment: "Applicant's name",
  })
  applicantName: string

  @Column({
    name: 'applicant_surname',
    comment: "Applicant's surname",
  })
  applicantSurname: string

  @Column({
    name: 'applicant_email',
    comment: "Applicant's email",
  })
  applicantEmail: string

  @Column({
    name: 'applicant_phone_number',
    comment: "Applicant's phone number with WatsApp",
  })
  applicantPhoneNumber: string

  @Column({
    type: 'enum',
    enum: ApplicantSex,
    name: 'applicant_sex',
    comment: "Applicant's sex",
  })
  applicantSex: ApplicantSex

  @Column({
    name: 'applicant_country',
    comment: "Applicant's country",
  })
  applicantCountry: string

  @Column('date', {
    name: 'applicant_birth_date',
    comment: "Applicant's birth date YYYY-MM-DD",
  })
  applicantBirthDate: Date

  @Column({
    name: 'applicant_residence_visa_avalibility',
    comment: 'Applicant has residence visa',
  })
  applicantResidenceVisaAvalibility: boolean

  @Column({
    name: 'applicant_preferred_direction_of_study',
    type: 'enum',
    enum: PreferredDirectionOfStudy,
    comment: "Applicant's preferred direction of study",
  })
  applicantPreferredDirectionOfStudy: PreferredDirectionOfStudy

  @OneToMany(() => Document, (doc) => doc.application, { cascade: ['insert', 'remove'] })
  documents: Document[]
}
