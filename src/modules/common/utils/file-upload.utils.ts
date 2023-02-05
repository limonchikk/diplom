import { UnprocessableEntityException } from '@nestjs/common'
import { Request } from 'express'
import { extname } from 'path'

export const imageFileFilter = (req: Request, file: Express.Multer.File, callback: Function) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new UnprocessableEntityException('Файл должен быть изображением!'), false)
  }
  callback(null, true)
}

export const editFileName = (req: Request, file: Express.Multer.File, callback: Function) => {
  const name = file.originalname.split('.')[0]
  const fileExtName = extname(file.originalname)
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')
  callback(null, `${name}-${randomName}${fileExtName}`)
}
