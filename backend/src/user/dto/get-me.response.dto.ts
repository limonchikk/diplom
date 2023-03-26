import { ApiProperty } from '@nestjs/swagger'

export class GetMeResponseDto {
  @ApiProperty({
    description: 'Электронная почта',
    type: String,
  })
  email?: string

  constructor(props: GetMeResponseDto) {
    this.email = props.email
  }
}
