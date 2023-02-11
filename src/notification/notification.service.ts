import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from '../user/user.service'
import { CreateQuestionDto } from './dto/create-question.dto'

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  private sendEmail(data: ISendMailOptions) {
    return this.mailerService.sendMail(data)
  }

  async sendQuestion(dto: CreateQuestionDto) {
    const toUser = await this.userService.getOne(this.configService.get('user.defaultLogin')!)

    return this.sendEmail({
      template: 'new-application',
      context: dto,
      subject: `Абитурент ${this.configService.get('app.serviceName')}! `,
      to: toUser.email,
    })
  }
}
