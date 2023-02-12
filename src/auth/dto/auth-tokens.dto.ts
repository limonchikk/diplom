import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AuthTokensDto {
  @ApiProperty({
    description: 'Access токен',
    type: String,
    required: true,
  })
  @IsString()
  accessToken: string
}
