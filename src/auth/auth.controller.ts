import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthTokens } from './auth.types'
import { AuthTokensDto } from './dto/auth-tokens.dto'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
@ApiTags('Авторизация/Регистрация')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Авторизация',
  })
  @ApiResponse({ status: HttpStatus.OK, type: AuthTokensDto })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() data: AuthDto): Promise<AuthTokens> {
    return this.authService.signIn(data)
  }
}
