import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { TestProcessor } from './user.processor'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), BullModule.registerQueue({ name: 'test' })],
  providers: [UserService, TestProcessor],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
