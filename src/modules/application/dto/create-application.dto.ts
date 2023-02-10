import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator'
import { ApplicantSex, PreferredDirectionOfStudy } from '../application.types'

export class ApplicationDocumentsDto {
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
  russianPassport!: Express.Multer.File

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

export class CreateApplicationDto extends ApplicationDocumentsDto {
  @ApiProperty({
    description: 'Имя абитуриента',
    type: String,
    required: true,
  })
  @Transform(({ value }) => {
    if (value && !isNaN(+value)) return false
    return value
  })
  @IsString({ message: 'Имя абитуриента должно быть строкой' })
  name!: string

  @ApiProperty({
    description: 'Фамилия абитуриента',
    type: String,
    required: true,
  })
  @Transform(({ value }) => {
    if (value && !isNaN(+value)) return false
    return value
  })
  @IsString({ message: 'Фамилия абитуриента должна быть строкой' })
  surname!: string

  @ApiProperty({
    description: 'Электронная почта абитуриента',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'Адрес электронной почты должен быть корректным' })
  email!: string

  @ApiProperty({
    description: 'Номер телефона абитуриента, привязанный к WhatsApp',
    type: String,
    required: true,
  })
  @IsNumberString({}, { message: 'Номер телефона должен состоять только из цифр' })
  @MinLength(11, { message: 'Номер телефона должен состоять ровно из 11 символов' })
  @MaxLength(11, { message: 'Номер телефона должен состоять ровно из 11 символов' })
  phoneNumber!: string

  @ApiProperty({
    description: 'Пол абитуриента',
    type: String,
    enum: ApplicantSex,
    required: true,
  })
  @IsEnum(ApplicantSex, { message: 'Пол абитуриента должен быть корректным' })
  sex!: ApplicantSex

  @ApiProperty({
    description: 'Страна проживания абитуриента',
    type: String,
    required: true,
  })
  @Transform(({ value }) => {
    if (value && !isNaN(+value)) return false
    return value
  })
  @IsString({ message: 'Страна проживания абитуриента должна быть строкой' })
  country!: string

  @ApiProperty({
    description: 'Дата рождения абитуриента',
    type: String,
    required: true,
  })
  @IsDateString({}, { message: 'Дата рождения абитуриента должна быть строкой и соответствовать ISO формату' })
  birthDate!: Date

  @ApiProperty({
    description: 'Наличие визы на проживание у абитуриента',
    type: Boolean,
    required: true,
  })
  @Type(() => Boolean)
  @IsBoolean({ message: 'Наличие визы на проживание у абитуриента должно иметь булевый тип' })
  residenceVisaAvalibility!: boolean

  @ApiProperty({
    description: 'Наиболее предпочтительное направление обучения для абитуриента',
    type: String,
    enum: PreferredDirectionOfStudy,
    required: true,
  })
  @IsEnum(PreferredDirectionOfStudy, { message: 'Наиболее предпочтительное направление обучения для абитуриента должно быть корректным' })
  preferredDirectionOfStudy!: PreferredDirectionOfStudy
}
