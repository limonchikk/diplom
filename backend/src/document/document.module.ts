import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Document } from '../models'
import { DocumentController } from './document.controller'
import { DocumentService } from './document.service'

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
