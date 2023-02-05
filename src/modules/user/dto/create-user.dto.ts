import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNumber, IsNumberString, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator'
import { PreferredDirectionOfStudy, UserSex } from '../user.types'

export class UserDocumentsDto {
  @ApiProperty({
    description: 'Оригинал паспорта',
    type: 'file',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  passportOriginal!: Express.Multer.File

  @ApiProperty({
    description: 'Паспорт на русском языке',
    type: 'file',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  russianPassort!: Express.Multer.File

  @ApiProperty({
    description: 'Оригинал документа об образовании',
    type: 'file',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  educationDocumentOriginal!: Express.Multer.File

  @ApiProperty({
    description: 'Оригинал об образовании на русском языке',
    type: 'file',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  russianEducationDocument!: Express.Multer.File
}

export class CreateUserDto extends UserDocumentsDto {
  @ApiProperty({
    description: 'Имя пользователя',
    type: String,
    required: true,
  })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  name!: string

  @ApiProperty({
    description: 'Фамилия пользователя',
    type: String,
    required: true,
  })
  @IsString({ message: 'Фамилия пользователя должна быть строкой' })
  surname!: string

  @ApiProperty({
    description: 'Электронная почта пользователя',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'Адрес электронной почты должен быть корректным' })
  email!: string

  @ApiProperty({
    description: 'Номер телефона пользователя, привязанный к WhatsApp',
    type: Number,
    required: true,
  })
  @IsNumber({}, { message: 'Номер телефона должен состоять только из цифр' })
  @MinLength(9, { message: 'Номер телефона должен состоять ровно из 11 символов' })
  @MaxLength(9, { message: 'Номер телефона должен состоять ровно из 11 символов' })
  phoneNumber!: number

  @ApiProperty({
    description: 'Пол пользователя',
    type: String,
    enum: UserSex,
    required: true,
  })
  @IsEnum(UserSex, { message: 'Пол пользователя должен быть корректным' })
  sex!: UserSex

  @ApiProperty({
    description: 'Страна проживания пользователя',
    type: String,
    required: true,
  })
  @IsString({ message: 'Страна проживания пользователя должна быть строкой' })
  country!: string

  @ApiProperty({
    description: 'Дата рождения пользователя пользователя',
    type: String,
    required: true,
  })
  @IsDateString({}, { message: 'Дата рождения пользователя должна быть строкой и соответствовать ISO формату' })
  birthDate!: Date

  @ApiProperty({
    description: 'Наличие визы на проживание',
    type: Boolean,
    required: true,
  })
  @IsBoolean({ message: 'Наличие визы на проживание должно иметь булевый тип' })
  residenceVisaAvalibility!: boolean

  @ApiProperty({
    description: 'Наиболее предпочтительное направление обучения',
    type: String,
    enum: PreferredDirectionOfStudy,
    required: true,
  })
  @IsEnum(PreferredDirectionOfStudy, { message: 'Наиболее предпочтительное направление обучения должно быть корректным' })
  preferredDirectionOfStudy!: PreferredDirectionOfStudy
}
