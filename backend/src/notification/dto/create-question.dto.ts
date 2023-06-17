import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsString } from 'class-validator'

export enum NotificationType {
  question = 'question',
  application = 'application',
}

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Текст сообщения',
    type: String,
    required: true,
  })
  @IsString({ message: 'Текст сообщения должен быть строкой' })
  text!: string

  @ApiProperty({
    description: 'Тип сообщения',
    type: String,
    required: true,
  })
  @IsString({ message: 'Тип сообщения должен быть корректным' })
  @IsEnum(NotificationType)
  type!: NotificationType

  // @ApiProperty({
  //   description: 'Имя абитуриента',
  //   type: String,
  //   required: true,
  // })
  // @IsString({ message: 'Имя абитуриента должно быть строкой' })
  // name!: string

  // @ApiProperty({
  //   description: 'Фамилия абитуриента',
  //   type: String,
  //   required: true,
  // })
  // @IsString({ message: 'Фамилия абитуриента должна быть строкой' })
  // surname!: string

  @ApiProperty({
    description: 'Электронная почта абитуриента для обратной связи',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'Электронная почта абитуриента должна быть корректной' })
  email!: string
}
