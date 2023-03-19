import { HttpStatus, Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerBuilder } from './common/swagger'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const config = app.get(ConfigService)

  SwaggerBuilder(app, config, Logger)
  app.setGlobalPrefix(config.get<string>('app.httpPrefix')!)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  )

  await app.listen(config.get('app.httpPort')!)
}
bootstrap()
