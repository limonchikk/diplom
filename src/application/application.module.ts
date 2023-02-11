import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Document } from '../models'
import { Application } from '../models'
import { ApplicationController } from './application.controller'
import { ApplicationService } from './application.service'

@Module({
  imports: [TypeOrmModule.forFeature([Application, Document])],
  providers: [ApplicationService],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationModule {}
