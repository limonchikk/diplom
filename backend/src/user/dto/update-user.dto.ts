import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'Адрес электронной почты должен быть корректным' })
  email: string
}
