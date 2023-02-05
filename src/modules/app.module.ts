import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Configuration from './app.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseOptionsFactory } from './database/options/factory'
import { UserModule } from './user/user.module'
import { APP_FILTER } from '@nestjs/core'
import { ApplicationExceptionFilter } from './common/filters/application.filter'
import { BullModule } from '@nestjs/bull'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => databaseOptionsFactory(config),
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UserModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ApplicationExceptionFilter }],
})
export class AppModule {}
