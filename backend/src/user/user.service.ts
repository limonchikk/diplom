import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../models'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdateUserResponseDto } from './dto/update-user.response.dto'

export interface GetOneParams {
  id?: string
  login?: string
}

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ userId: id })

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    user.email = dto.email

    await this.userRepository.save(user)
    return new UpdateUserResponseDto({ id: user.userId })
  }

  async getOne(params: GetOneParams) {
    const searchParams = {
      ...(params.id && { userId: params.id }),
      ...(params.login && { login: params.login }),
    }

    const user = await this.userRepository.findOneBy(searchParams)

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    return user
  }
}
