import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { Application } from '../../models'

export class SearchDto {
  @ApiProperty({
    description: 'Поле, по которому производится поиск',
    type: String,
    required: false,
  })
  @IsOptional()
  searchBy: keyof Application

  @ApiProperty({
    description: 'Текст, по которому производится поиск',
    type: String,
    required: false,
  })
  @IsOptional()
  text: string
}

export class FindApplicationParamDto {
  @ApiProperty({
    description: 'Идентификатор заявки',
    type: String,
    required: false,
  })
  @IsOptional()
  id?: string

  @ApiProperty({
    description: 'Просмотрена ли заявка',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  viewed?: boolean

  @ApiProperty({
    description: 'Поле, по которому производится поиск',
    type: String,
    required: false,
  })
  @IsOptional()
  searchBy: keyof Application

  @ApiProperty({
    description: 'Текст, по которому производится поиск',
    type: String,
    required: false,
  })
  @IsOptional()
  text: string
}
