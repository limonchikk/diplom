import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DocumentService } from './document.service'

@Module({
  imports: [ConfigModule],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
