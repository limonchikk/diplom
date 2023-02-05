import { Body, Controller, Post, UploadedFiles } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiFile } from '../common/decorators/api-file'
import { CreateUserDto, UserDocumentsDto } from './dto/create-user.dto'
import { Document } from './entities/document.entity'

@Controller('user')
@ApiTags('Пользователь')
export class UserController {
  constructor() {}

  @Post()
  @ApiFile(['passportOriginal', 'russianPassort'])
  create(@UploadedFiles() files: Express.Multer.File[], @Body() dto: UserDocumentsDto) {
    // const d = new Document()
    console.log(files)
    // console.log(dto)
    // console.log(this.queue)
    return '123'
  }
}
