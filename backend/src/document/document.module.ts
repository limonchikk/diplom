import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicationModule } from '../application/application.module'
import { Document } from '../models'
import { DocumentController } from './document.controller'
import { DocumentService } from './document.service'

@Module({
  imports: [TypeOrmModule.forFeature([Document]), ApplicationModule],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
