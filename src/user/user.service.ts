import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../models'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ userId: id })

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    await this.userRepository.update(user, dto)
  }

  async getOne(id: string) {
    const user = await this.userRepository.findOneBy({ userId: id })

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    return user
  }
}
