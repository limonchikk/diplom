import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsString } from 'class-validator'
import { Application } from '../../models'

export class StatisticsParamDto {
  @ApiProperty({
    description: 'Поле, по которому будет производится группировка',
    type: String,
  })
  @IsString()
  groupBy: 'applicant_registration_country' | 'applicant_preferred_direction_of_study' | 'month' | 'year'

  @ApiProperty({
    description: 'Дата начала поиска',
    type: Date,
  })
  @IsDateString()
  from: Date

  @ApiProperty({
    description: 'Дата конца поиска',
    type: Date,
  })
  @IsDateString()
  to: Date
}
