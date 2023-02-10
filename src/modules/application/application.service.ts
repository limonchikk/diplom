import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateApplicationDto } from './dto/create-application.dto'
import { Application } from './entities/application.entity'
import { Document } from './entities/document.entity'
import { ApplicantDocumentType } from './application.types'
import fs from 'fs/promises'
import path from 'path'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import { CreateApplicationResponseDto } from './dto/create-application.response.dto'

@Injectable()
export class ApplicationService implements OnModuleInit {
  constructor(@InjectRepository(Application) private applicantRepository: Repository<Application>, private readonly appConfig: ConfigService) {}

  async onModuleInit() {
    const folderName = this.appConfig.get('document.folder') as string
    try {
      await fs.mkdir(folderName, { recursive: true })
    } catch (err) {
      console.log(`Directory already exists for ${folderName}`)
    }
  }

  async save(dto: CreateApplicationDto, files: Express.Multer.File[]) {
    const application = new Application()
    application.applicantName = dto.name
    application.applicantSurname = dto.surname
    application.applicantEmail = dto.email
    application.applicantPhoneNumber = dto.phoneNumber
    application.applicantSex = dto.sex
    application.applicantCountry = dto.country
    application.applicantBirthDate = dto.birthDate
    application.applicantResidenceVisaAvalibility = dto.residenceVisaAvalibility
    application.applicantPreferredDirectionOfStudy = dto.preferredDirectionOfStudy
    application.documents = []

    const savedFilesIds: string[] = []

    try {
      const documents = await Promise.all(
        files.map(async (f) => {
          const documentId = uuidv4()

          await fs.writeFile(path.join(this.appConfig.get('files.folder')!, documentId), f.buffer)
          return { fieldName: f.fieldname, id: documentId }
        }),
      )

      savedFilesIds.push(...documents.map((d) => d.id))

      documents.forEach((doc) => {
        const documentEntity = new Document()
        documentEntity.documentId = doc.id
        documentEntity.type = ApplicantDocumentType[doc.fieldName as keyof typeof ApplicantDocumentType]

        application.documents.push(documentEntity)
      })

      await this.applicantRepository.save(application)
    } catch (err) {
      await Promise.all(
        savedFilesIds.map((di) => {
          return fs.rm(path.join(this.appConfig.get('files.folder')!, di))
        }),
      )

      throw new BadRequestException('Произошла неизвестная ошибка при оформлении заявки')
    }

    return new CreateApplicationResponseDto({ created: true })
  }
}
