import { applyDecorators, UnprocessableEntityException, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes } from '@nestjs/swagger'
import { Request } from 'express'
import { diskStorage } from 'multer'
import { extname } from 'path'

export const ApiFile = (fileNames: string[]): MethodDecorator =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(
      FileFieldsInterceptor(
        fileNames.map((fileName) => ({ name: fileName, maxCount: 1 })),
        {
          limits: { files: 4, fileSize: 1024 * 1024 * 100 },
          fileFilter: (req: Request, file: Express.Multer.File, callback: Function) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
              return callback(new UnprocessableEntityException('Файл должен быть изображением!'), false)
            }
            callback(null, true)
          },
        },
      ),
    ),
  )
