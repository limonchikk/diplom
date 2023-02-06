import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApplicantDocumentsDto, CreateApplicantDto } from './dto/create-applicant.dto'
import { Applicant } from './entities/applicant.entity'

import { DocumentService } from '../document/document.service'
import moment from 'moment'
import { Document } from '../document/entities/document.entity'
import { ApplicantDocumentType } from './applicant.types'

@Injectable()
export class ApplicantService {
  constructor(private readonly documentService: DocumentService, @InjectRepository(Applicant) private applicantRepository: Repository<Applicant>) {}

  async save(dto: CreateApplicantDto, files: Express.Multer.File[]) {
    const applicant = new Applicant()
    applicant.name = dto.name
    applicant.surname = dto.surname
    applicant.email = dto.email
    applicant.phoneNumber = dto.phoneNumber
    applicant.sex = dto.sex
    applicant.country = dto.country
    applicant.birthDate = dto.birthDate
    applicant.residenceVisaAvalibility = dto.residenceVisaAvalibility
    applicant.preferredDirectionOfStudy = dto.preferredDirectionOfStudy
    applicant.documents = []

    const documents = await this.documentService.bulkSave({
      folderName: `${applicant.surname}_${applicant.name}_${moment().format('DD.MM.YYYY')}`,
      files: files.map((f) => ({
        buffer: f.buffer,
        name: this.mapToLocaleName(f.fieldname as keyof ApplicantDocumentsDto),
        originalName: f.originalname,
        fieldName: f.fieldname,
      })),
    })

    documents.forEach((doc) => {
      const documentEntity = new Document()
      documentEntity.type = ApplicantDocumentType[doc.fieldName as keyof typeof ApplicantDocumentType]
      documentEntity.base64 = doc.b64

      applicant.documents.push(documentEntity)
    })

    await this.applicantRepository.save(applicant)
  }

  private mapToLocaleName(fieldName: keyof ApplicantDocumentsDto) {
    switch (fieldName) {
      case 'passportOriginal':
        return 'Оригинал_паспорта'
      case 'russianPassport':
        return 'Паспорт_на_русском'
      case 'educationDocumentOriginal':
        return 'Оригинал_документа_об_образовании'
      case 'russianEducationDocument':
        return 'Документ_об_образовании_на_русском'
      default:
        return 'Нераспознанный_документ'
    }
  }
}
