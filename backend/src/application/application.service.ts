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
import { StatisticsParamDto } from './dto/statistics.dto'
import { StatisticsResponseDto } from './dto/statistics.response.dto'
import { UpdateApplicationDto } from './dto/update-application.dto'
import moment from 'moment'

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
    application.applicantFio = [dto.surname, dto.name, dto.patronymic].join(' ')
    application.applicantEmail = dto.email
    application.applicantPhoneNumber = dto.phoneNumber
    application.applicantSex = dto.sex
    application.applicantRegistrationCountry = dto.registrationCountry
    application.applicantLivingCountry = dto.livingCountry
    application.applicantBirthDate = dto.birthDate
    application.applicantResidenceVisaAvalibility = dto.residenceVisaAvalibility
    application.applicantPreferredDirectionOfStudy = dto.preferredDirectionOfStudy
    application.representative = dto.representative

    const currentDate = moment().toDate()
    application.createdAt = currentDate
    application.updatedAt = currentDate

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
      await this.applicationRepository.save(application)

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

  //TODO:
  async statistics(params: StatisticsParamDto) {
    if (params.groupBy === 'applicant_preferred_direction_of_study' || params.groupBy === 'applicant_registration_country') {
      const res = await this.applicationRepository.query(
        `SELECT ${params.groupBy} as key, count(*) FROM applications WHERE created_at >= $1::date AND created_at <= $2::date GROUP BY ${params.groupBy}`,
        [params.from, params.to],
      )
      return new StatisticsResponseDto({ bars: res })
    }

    if (params.groupBy === 'month') {
      const res = await this.applicationRepository.query(
        `SELECT DATE_TRUNC('month', created_at) as key, count(*) as count FROM applications WHERE created_at >= $1::date AND created_at <= $2::date GROUP BY key`,
        [params.from, params.to],
      )
      return new StatisticsResponseDto({ bars: res })
    }

    const res = await this.applicationRepository.query(
      `SELECT DATE_TRUNC('year', created_at) as key, count(*) as count FROM applications WHERE created_at >= $1::date AND created_at <= $2::date GROUP BY key`,
      [params.from, params.to],
    )
    return new StatisticsResponseDto({ bars: res })
  }

  async update(dto: UpdateApplicationDto) {
    const application = await this.getOne(dto.id)

    const currentDate = moment().toDate()
    application.updatedAt = currentDate

    await this.applicationRepository.update({ applicationId: application.applicationId }, { viewed: dto.viewed })

    return { ...application, viewed: dto.viewed }
  }
}
