import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class GetDocumentDto {
  @ApiProperty({
    description: 'Идентификатор документа',
    type: String,
    required: true,
  })
  @IsUUID(4, { message: 'Идентификатор документа должен быть в формате uuid' })
  id!: string
}
