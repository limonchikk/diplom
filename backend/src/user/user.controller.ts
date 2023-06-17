import { Body, Controller, Get, HttpStatus, Post, Put, Request } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtToken } from '../auth/auth.types'
import { ExtractUser } from '../common/decorators/extract-user-from-request'
import { JwtAuthGuard } from '../common/guards/auth.guard'
import { GetMeResponseDto } from './dto/get-me.response.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdateUserResponseDto } from './dto/update-user.response.dto'
import { UserService } from './user.service'

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Обновление',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: UpdateUserResponseDto,
  })
  @JwtAuthGuard()
  @Put()
  update(@Body() dto: UpdateUserDto, @ExtractUser() user: JwtToken) {
    return this.userService.update(user.id, dto)
  }

  @ApiOperation({
    summary: 'Информация о себе',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: UpdateUserResponseDto,
  })
  @JwtAuthGuard()
  @Get('me')
  async me(@ExtractUser() user: JwtToken) {
    const { email } = await this.userService.getOne({ id: user.id })
    return new GetMeResponseDto({ email })
  }
}
