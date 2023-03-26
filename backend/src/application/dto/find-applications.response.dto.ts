import { ApiProperty } from '@nestjs/swagger'
import { Application } from '../../models'

export class FindApplicationResponseDto {
  @ApiProperty({
    description: 'Заявки',
    type: [Application],
  })
  applications: Application[]

  @ApiProperty({
    description: 'Всего заявок',
    type: Number,
  })
  count: number

  constructor(props: FindApplicationResponseDto) {
    this.applications = props.applications
    this.count = props.count
  }
}
