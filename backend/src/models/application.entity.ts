import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Auditable } from '../common/entities/auditable.entity'
import { Document } from './document.entity'

export enum PreferredDirectionOfStudy {
  Technical = 'technical',
  Medical = 'medical',
}

export enum ApplicantSex {
  Male = 'male',
  Female = 'female',
}

export type Representative = {
  name: string
  surname: string
  patronymic: string
  email: string
  phoneNumber: string
}

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
    name: 'applicant_patronymic',
    comment: "Applicant's patronymic",
  })
  applicantPatronymic: string

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
    name: 'applicant_registration_country',
    comment: "Applicant's registration country",
  })
  applicantRegistrationCountry: string

  @Column({
    name: 'applicant_living_country',
    comment: "Applicant's living country",
  })
  applicantLivingCountry: string

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

  @Column({
    comment: 'Application is viewed by admin user',
    default: false,
  })
  viewed: boolean

  @Column({
    comment: 'Applicant representative',
    nullable: true,
    type: 'jsonb',
  })
  representative?: Representative

  @OneToMany(() => Document, (doc) => doc.application, { cascade: ['insert', 'remove'] })
  documents: Document[]
}
