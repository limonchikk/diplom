import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PreferredDirectionOfStudy, UserSex } from '../user.types'
import { Document } from './document.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
    comment: "User's unique identifier",
  })
  readonly userId!: string

  @Column({
    comment: "User's name",
  })
  name: string

  @Column({
    comment: "User's surname",
  })
  surname: string

  @Column({
    comment: "User's email",
    unique: true,
  })
  email: string

  @Column({
    comment: "User's phone number with WatsApp",
    unique: true,
  })
  phoneNumber: number

  @Column({
    type: 'enum',
    enum: UserSex,
    comment: "User's sex",
  })
  sex: UserSex

  @Column({
    comment: "User's country",
  })
  country: string

  @Column('date', {
    name: 'birth_date',
    comment: "User's birth date YYYY-MM-DD",
  })
  birthDate: Date

  @Column({
    comment: 'User has residence visa',
  })
  residenceVisaAvalibility: boolean

  @Column({
    name: 'direction_of_study',
    type: 'enum',
    enum: PreferredDirectionOfStudy,
    comment: "User's preferred direction of study",
  })
  preferredDirectionOfStudy: PreferredDirectionOfStudy

  @OneToMany(() => Document, (doc) => doc.user)
  documents: Document[]

  // constructor(props: Omit<User, 'id'>) {
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
