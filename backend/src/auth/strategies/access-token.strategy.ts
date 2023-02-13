import { Injectable, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../../user/user.service'
import { JwtPayload } from '../auth.types'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = this.userService.getOne({ id: payload.id })

    if (!user) {
      throw new NotFoundException('Пользователь не найден.')
    }

    return payload
  }
}
