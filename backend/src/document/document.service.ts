import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Document } from '../models'
import fs from 'fs'
import path from 'path'

@Injectable()
export class DocumentService {
  constructor(@InjectRepository(Document) private documentRepository: Repository<Document>, private readonly appConfig: ConfigService) {}

  async getOne(id: string) {
    const documentData = await this.documentRepository.findOne({ where: { documentId: id }, relations: { application: true } })
    if (!documentData) {
      throw new NotFoundException('Документ не найден')
    }
    const { applicantFio } = documentData.application
    const fileName = applicantFio.replaceAll(' ', '_')

    return {
      fileName,
      documentType: documentData.type,
      mimetype: documentData.mimetype,
      stream: fs.createReadStream(path.join(this.appConfig.get('files.folder')!, documentData.documentId)),
    }
  }
}
