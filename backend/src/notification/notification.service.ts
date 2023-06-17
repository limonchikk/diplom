import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from '../user/user.service'
import { CreateNotificationDto, NotificationType } from './dto/create-question.dto'

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

  async sendQuestion(dto: CreateNotificationDto) {
    const toUser = await this.userService.getOne(this.configService.get('user.defaultLogin')!)

    let subject = ''

    if (dto.type === NotificationType.question) {
      subject = `Новый вопрос от абитуриента!`
    } else if (dto.type === NotificationType.application) {
      subject = `Новая заявка от абитуриента!`
    } else {
      subject = `Уведомление!`
    }

    return this.sendEmail({
      template: 'new-application',
      context: dto,
      subject,
      to: toUser.email,
    })
  }
}
