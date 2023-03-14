import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { NotificationService } from './notification.service'
import { UserModule } from '../user/user.module'
import { NotificationController } from './notification.controller'

@Module({
  providers: [NotificationService],
  exports: [],
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config)
        return {
          transport: {
            host: config.get('mailer.host'),
            port: 465,
            secure: true,
            auth: {
              user: config.get('mailer.user'),
              pass: config.get('mailer.password'),
            },
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          defaults: {
            from: config.get('mailer.user'),
          },
        }
      },
    }),
    UserModule,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
