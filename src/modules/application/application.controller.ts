import { Body, Controller, HttpStatus, Post, UploadedFiles } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiFile } from '../common/decorators/api-file'
import { ApplicationService } from './application.service'
import { CreateApplicationDto, ApplicationDocumentsDto } from './dto/create-application.dto'
import { CreateApplicationResponseDto } from './dto/create-application.response.dto'

@ApiTags('Заявки на обучение для иностранных граждан')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiOperation({
    summary: 'Создание заявки',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: CreateApplicationResponseDto,
  })
  @ApiFile(Object.keys(new ApplicationDocumentsDto()))
  @Post()
  create(@UploadedFiles() files: Record<string, Express.Multer.File[]>, @Body() dto: CreateApplicationDto) {
    return this.applicationService.save(
      dto,
      Object.values(files).map((v) => v[0]),
    )
  }
}
