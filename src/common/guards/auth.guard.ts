import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AccessTokenGuard } from './access-token.guard'

export function JwtAuthGuard(): MethodDecorator {
  return applyDecorators(ApiBearerAuth(), UseGuards(AccessTokenGuard))
}
