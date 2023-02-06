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
  phoneNumber: number

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

  @OneToMany(() => Document, (doc) => doc.applicant)
  documents: Document[]

  // constructor(props: Omit<Applicant, 'id'>) {
  //   this.name = props.name
  //   this.surname = props.surname
  //   this.email = props.email
  //   this.phoneNumber = props.phoneNumber
  //   this.sex = props.sex
  //   this.country = props.country
  //   this.birthDate = props.birthDate
  //   this.residenceVisaAvalibility = props.residenceVisaAvalibility
  //   this.preferredDirectionOfStudy = props.preferredDirectionOfStudy
  //   this.documents = props.documents
  // }
}
