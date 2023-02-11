import { ApiProperty } from '@nestjs/swagger'

export class CreateApplicationResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор созданной заявки',
    type: String,
  })
  id: string

  constructor(props: CreateApplicationResponseDto) {
    this.id = props.id
  }
}
