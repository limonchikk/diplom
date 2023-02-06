import { Body, Controller, Post, UploadedFiles } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiFile } from '../common/decorators/api-file'
import { ApplicantService } from './applicant.service'
import { CreateApplicantDto, ApplicantDocumentsDto } from './dto/create-applicant.dto'

@Controller('applicant')
@ApiTags('Пользователь')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  @ApiFile(Object.keys(new ApplicantDocumentsDto()))
  create(@UploadedFiles() files: Record<string, Express.Multer.File[]>, @Body() dto: CreateApplicantDto) {
    return this.applicantService.save(
      dto,
      Object.values(files).map((v) => v[0]),
    )
  }
}
