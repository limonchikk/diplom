import { Body, Controller, HttpStatus, Post, UploadedFiles } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  @Post()
  update(@Body() dto: UpdateUserDto) {
    //TODO: jwt payload id
    return this.userService.update('id', dto)
  }
}
