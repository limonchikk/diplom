import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('Пользователь')
export class UserController {
  constructor() {}

  @Get()
  test() {
    return '123'
  }
}
