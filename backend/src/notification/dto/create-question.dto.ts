import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Вопрос абитуриента',
    type: String,
    required: true,
  })
  @IsString({ message: 'Вопрос абитуриента должен быть строкой' })
  question!: string

  // @ApiProperty({
  //   description: 'Имя абитуриента',
  //   type: String,
  //   required: true,
  // })
  // @IsString({ message: 'Имя абитуриента должно быть строкой' })
  // name!: string

  // @ApiProperty({
  //   description: 'Фамилия абитуриента',
  //   type: String,
  //   required: true,
  // })
  // @IsString({ message: 'Фамилия абитуриента должна быть строкой' })
  // surname!: string

  @ApiProperty({
    description: 'Электронная почта абитуриента для обратной связи',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'Электронная почта абитуриента должна быть корректной' })
  email!: string
}
