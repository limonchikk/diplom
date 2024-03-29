import { Body, Controller, Get, HttpStatus, Post, Query, UploadedFiles } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiFile } from '../common/decorators/api-file'
import { JwtAuthGuard } from '../common/guards/auth.guard'
import { Application } from '../models'
import { ApplicationService } from './application.service'
import { CreateApplicationDto, ApplicationDocumentsDto } from './dto/create-application.dto'
import { CreateApplicationResponseDto } from './dto/create-application.response.dto'
import { FindApplicationParamDto } from './dto/find-application-param.dto'
import { FindApplicationResponseDto } from './dto/find-applications.response.dto'
import { StatisticsParamDto } from './dto/statistics.dto'
import { StatisticsResponseDto } from './dto/statistics.response.dto'
import { UpdateApplicationDto } from './dto/update-application.dto'

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

  @ApiOperation({
    summary: 'Получение заявок',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
  })
  @JwtAuthGuard()
  @Get()
  find(@Query() query: FindApplicationParamDto): Promise<FindApplicationResponseDto> {
    return this.applicationService.find(query)
  }

  @ApiOperation({
    summary: 'Статистика',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
  })
  @Get('statistics')
  @JwtAuthGuard()
  statistics(@Query() query: StatisticsParamDto): Promise<StatisticsResponseDto> {
    return this.applicationService.statistics(query)
  }

  @ApiOperation({
    summary: 'Обновление',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
  })
  @Post('update')
  @JwtAuthGuard()
  update(@Body() dto: UpdateApplicationDto) {
    return this.applicationService.update(dto)
  }
}
