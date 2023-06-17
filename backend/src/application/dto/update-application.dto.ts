import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class UpdateApplicationDto {
  @ApiProperty({
    description: 'ИД заявки',
    type: Boolean,
    required: true,
  })
  @IsString()
  id!: string

  @ApiProperty({
    description: 'Заявка просмотрена',
    type: Boolean,
    required: true,
  })
  @IsBoolean()
  viewed!: boolean
}
