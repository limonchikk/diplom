import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор обновленного пользователя',
    type: String,
  })
  id: string

  @ApiProperty({
    description: 'Адрес электронной почты',
    type: String,
  })
  email: string

  constructor(props: UpdateUserResponseDto) {
    this.id = props.id
    this.email = props.email
  }
}
