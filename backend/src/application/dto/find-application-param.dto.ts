import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class FindApplicationParamDto {
  @ApiProperty({
    description: 'Просмотрена ли заявка',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  viewed?: boolean
}
