import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Document } from '../document/entities/document.entity'
import { Applicant } from './entities/applicant.entity'
import { ApplicantController } from './applicant.controller'
import { ApplicantService } from './applicant.service'
import { DocumentModule } from '../document/document.module'

@Module({
  imports: [DocumentModule, TypeOrmModule.forFeature([Applicant, Document])],
  providers: [ApplicantService],
  controllers: [ApplicantController],
  exports: [ApplicantService],
})
export class ApplicantModule {}
