import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AuthDto {
  @ApiProperty({
    description: 'Логин',
    type: String,
    required: true,
  })
  @IsString()
  login: string

  @ApiProperty({
    description: 'Пароль',
    type: String,
    required: true,
  })
  @IsString()
  password: string
}
