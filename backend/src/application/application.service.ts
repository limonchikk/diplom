import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'
import { CreateApplicationDto } from './dto/create-application.dto'
import { Application } from '../models'
import fs from 'fs/promises'
import path from 'path'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import { CreateApplicationResponseDto } from './dto/create-application.response.dto'
import { Document } from '../models'
import { ApplicantDocumentType } from '../models/document.entity'
import { FindApplicationParamDto } from './dto/find-application-param.dto'
import { FindApplicationResponseDto } from './dto/find-applications.response.dto'

@Injectable()
export class ApplicationService implements OnModuleInit {
  constructor(@InjectRepository(Application) private applicationRepository: Repository<Application>, private readonly appConfig: ConfigService) {}

  async onModuleInit() {
    const folderName = this.appConfig.get('files.folder') as string
    try {
      await fs.mkdir(folderName, { recursive: true })
    } catch (err) {
      console.log(`Directory already exists for ${folderName}`)
    }
  }

  async save(dto: CreateApplicationDto, files: Express.Multer.File[]) {
    const application = new Application()
    application.applicantFio = [dto.name, dto.surname, dto.patronymic].join(' ')
    application.applicantEmail = dto.email
    application.applicantPhoneNumber = dto.phoneNumber
    application.applicantSex = dto.sex
    application.applicantRegistrationCountry = dto.registrationCountry
    application.applicantLivingCountry = dto.livingCountry
    application.applicantBirthDate = dto.birthDate
    application.applicantResidenceVisaAvalibility = dto.residenceVisaAvalibility
    application.applicantPreferredDirectionOfStudy = dto.preferredDirectionOfStudy
    application.representative = dto.representative
    application.documents = []

    try {
      await Promise.all(
        files.map(async (f) => {
          const documentId = uuidv4()

          await fs.writeFile(path.join(this.appConfig.get('files.folder')!, documentId), f.buffer)

          const documentEntity = new Document()
          documentEntity.documentId = documentId
          documentEntity.type = ApplicantDocumentType[f.fieldname as keyof typeof ApplicantDocumentType]
          documentEntity.mimetype = f.mimetype
          application.documents.push(documentEntity)
        }),
      )

      const data = await this.applicationRepository.save(application)
      return new CreateApplicationResponseDto({ id: data.applicationId })
    } catch (err) {
      console.log(err)
      await Promise.all(
        application.documents.map((di) => {
          return fs.rm(path.join(this.appConfig.get('files.folder')!, di.documentId))
        }),
      )

      throw new BadRequestException('Произошла неизвестная ошибка при оформлении заявки')
    }
  }

  async getOne(id: string) {
    const application = await this.applicationRepository.findOne({ where: { applicationId: id }, relations: { documents: true } })

    if (!application) {
      throw new NotFoundException('Application not found')
    }
    return application
  }

  async find(params: FindApplicationParamDto) {
    if ((params.searchBy && !params.text) || (!params.searchBy && params.text)) {
      throw new BadRequestException('Bad search filter')
    }

    const { text, searchBy, ...data } = params

    const [applications, count] = await this.applicationRepository.findAndCount({
      where: {
        ...data,
        ...(text && searchBy && { [searchBy]: ILike(`%${text}%`) }),
      },
      relations: { documents: true },
    })
    return new FindApplicationResponseDto({ applications, count })
  }
}
