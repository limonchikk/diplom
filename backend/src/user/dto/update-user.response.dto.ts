import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор обновленного пользователя',
    type: String,
  })
  id: string

  constructor(props: UpdateUserResponseDto) {
    this.id = props.id
  }
}
