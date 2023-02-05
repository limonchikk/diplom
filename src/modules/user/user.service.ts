import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { Document } from './entities/document.entity'
import { User } from './entities/user.entity'

import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async save(dto: CreateUserDto, files: Express.Multer.File[]) {
    const user = new User()
    user.name = dto.name
    user.surname = dto.surname
    user.email = dto.email
    user.phoneNumber = dto.phoneNumber
    user.sex = dto.sex
    user.country = dto.country
    user.birthDate = dto.birthDate
    user.residenceVisaAvalibility = dto.residenceVisaAvalibility
    user.preferredDirectionOfStudy = dto.preferredDirectionOfStudy

    for (const file of files) {
      const documentId = uuidv4()

      const fileName = await fs.writeFile('./files', file.fieldname)
    }
  }
}
