import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ApplicantSex, PreferredDirectionOfStudy } from '../../models/application.entity'

export class RepresentativeDto {
  @ApiProperty({
    description: 'Имя представителя',
    type: String,
    required: true,
  })
  @Transform(({ value }) => {
    if (value && !isNaN(+value)) return false
    return value
  })
  @IsString({ message: 'Representative name should be a string' })
  name!: string

  @ApiProperty({
    description: 'Фамилия представителя',
    type: String,
    required: true,
  })
  @Transform(({ value }) => {
    if (value && !isNaN(+value)) return false
    return value
  })
  @IsString({ message: 'Representative surname should be a string' })
  surname!: string

  @ApiProperty({
    description: 'Отчество представителя',
    type: String,
    required: true,
  })
  @IsString({ message: 'Representative patronymic should be a string' })
  @IsOptional()
  patronymic!: string

  @ApiProperty({
    description: 'Электронная почта представителя',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'The E-mail of Representative must be correct' })
  email!: string // +

  @ApiProperty({
    description: 'Номер телефона представителя, привязанный к WhatsApp',
    type: String,
    required: true,
  })
  @IsNumberString({}, { message: 'The phone number of Representative must contain numbers only' })
  phoneNumber!: string // +
}

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
  @IsString({ message: 'Name should be a string' })
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
  @IsString({ message: 'Surname should be a string' })
  surname!: string

  @ApiProperty({
    description: 'Отчество абитуриента',
    type: String,
    required: true,
  })
  @IsString({ message: 'Patronymic should be a string' })
  @IsOptional()
  patronymic!: string

  @ApiProperty({
    description: 'Электронная почта абитуриента',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'Enter the correct E-mail' })
  email!: string // +

  @ApiProperty({
    description: 'Номер телефона абитуриента, привязанный к WhatsApp',
    type: String,
    required: true,
  })
  @IsNumberString({}, { message: 'Phone number should be valid' })
  phoneNumber!: string // +

  @ApiProperty({
    description: 'Пол абитуриента',
    type: String,
    enum: ApplicantSex,
    required: true,
  })
  @IsEnum(ApplicantSex, { message: 'Gender not specified' })
  sex!: ApplicantSex // +

  @ApiProperty({
    description: 'Страна регистрации абитуриента',
    type: String,
    required: true,
  })
  @Transform(({ value }) => {
    if (value && !isNaN(+value)) return false
    return value
  })
  @IsString({ message: 'Citizenship should be string' })
  registrationCountry!: string // +

  @ApiProperty({
    description: 'Страна проживания абитуриента',
    type: String,
    required: true,
  })
  @Transform(({ value }) => {
    if (value && !isNaN(+value)) return false
    return value
  })
  @IsString({ message: 'Residence country should be string' })
  livingCountry!: string // =

  @ApiProperty({
    description: 'Дата рождения абитуриента',
    type: String,
    required: true,
  })
  @Transform(({ value }) => {
    let tmp = value.split('.')

    const momentApplicantBirthDate = `${tmp[2]}-${tmp[1]}-${tmp[0]}`
    if (!momentApplicantBirthDate) return false
    return momentApplicantBirthDate
  })
  @IsDateString({}, { message: 'Date of Birth should be valid' })
  birthDate!: Date // +

  @ApiProperty({
    description: 'Наличие визы на проживание в России у абитуриента',
    type: Boolean,
    required: true,
  })
  @Type(() => Boolean)
  @IsBoolean({ message: 'Presence of Russian visa not specified' })
  residenceVisaAvalibility!: boolean // +

  @ApiProperty({
    description: 'Наиболее предпочтительное направление обучения для абитуриента',
    type: String,
    enum: PreferredDirectionOfStudy,
    required: true,
  })
  @IsEnum(PreferredDirectionOfStudy, { message: 'Educational program not specified' })
  preferredDirectionOfStudy!: PreferredDirectionOfStudy // +

  @ApiProperty({
    description: 'Представитель абитуриента',
    type: RepresentativeDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => RepresentativeDto)
  representative?: RepresentativeDto // +
}
