import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ChartBar {
  @ApiProperty({
    description: 'Столбец',
    type: String,
  })
  @IsString()
  key: string

  @ApiProperty({
    description: 'Значение',
    type: Number,
  })
  @IsString()
  value: number
}

export class StatisticsResponseDto {
  @ApiProperty({
    description: 'Данные',
    type: [ChartBar],
  })
  bars: ChartBar[]

  constructor(props: StatisticsResponseDto) {
    this.bars = props.bars
  }
}
