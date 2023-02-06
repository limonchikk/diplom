import { Injectable } from '@nestjs/common'
import { extname } from 'path'
import { ApplicantDocuments } from '../applicant/applicant.types'
import fs from 'fs/promises'
import path from 'path'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DocumentService {
  constructor(private readonly appConfig: ConfigService) {}

  async bulkSave(data: ApplicantDocuments) {
    const folderName = path.join(this.appConfig.get('document.folder')!, data.folderName)

    try {
      await fs.mkdir(folderName, { recursive: true })
    } catch (err) {
      console.log(`Directory already exists for ${data.folderName}`)
    }

    const documents = await Promise.all(
      data.files.map(async (f) => {
        const fileName = `${f.name}${extname(f.originalName)}`
        await fs.writeFile(path.join(folderName, fileName), f.buffer)

        return { fieldName: f.fieldName, b64: f.buffer.toString('base64') }
      }),
    )
    return documents
  }
}
