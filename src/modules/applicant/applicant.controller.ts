import { Body, Controller, Post, UploadedFiles } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiFile } from '../common/decorators/api-file'
import { ApplicantService } from './applicant.service'
import { CreateApplicantDto, ApplicantDocumentsDto } from './dto/create-applicant.dto'
import { Document } from '../document/entities/document.entity'

@Controller('applicant')
@ApiTags('Пользователь')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  @ApiFile(['passportOriginal', 'russianPassort', 'educationDocumentOriginal', 'russianEducationDocument'])
  create(@UploadedFiles() files: Express.Multer.File[], @Body() dto: CreateApplicantDto) {
    return this.applicantService.save(dto, files)
  }
}
