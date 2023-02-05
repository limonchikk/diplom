import { InjectQueue } from '@nestjs/bull'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Queue } from 'bull'

@Controller('user')
@ApiTags('Пользователь')
export class UserController {
  constructor(@InjectQueue('test') private queue: Queue) {}

  @Get()
  test() {
    // console.log(this.queue)
    this.queue.add('one', { data: 'anydata' })
    return '123'
  }
}
