import { Body, Controller, HttpStatus, Post, UploadedFiles } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiFile } from '../common/decorators/api-file'
import { CreateQuestionDto } from './dto/create-question.dto'
import { NotificationService } from './notification.service'

@ApiTags('Отправка писем/уваедомлений')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly applicationService: NotificationService) {}

  @ApiOperation({
    summary: 'Отправить письмо',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
  })
  @Post('sendMail')
  create(@Body() dto: CreateQuestionDto) {
    return this.applicationService.sendQuestion(dto)
  }
}
