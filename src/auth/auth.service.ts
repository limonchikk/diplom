import { Injectable, NotFoundException } from '@nestjs/common'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthDto } from './dto/auth.dto'
import { AuthTokens, JwtPayload } from './auth.types'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) {}

  async signIn(data: AuthDto): Promise<AuthTokens> {
    const user = await this.userService.getOne({ login: data.login })

    const passwordMatches = await argon2.verify(user.password, data.password)
    if (!passwordMatches) throw new NotFoundException('Пользователь не найден')

    return this.getTokens({ id: user.userId })
  }

  async getTokens(payload: JwtPayload): Promise<AuthTokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.accessSecret'),
      expiresIn: this.configService.get<string>('jwt.accessExp'),
    })

    return {
      accessToken,
    }
  }
}
