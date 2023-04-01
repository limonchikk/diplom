import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { JwtAuthGuard } from '../common/guards/auth.guard'
import { DocumentService } from './document.service'
import { GetDocumentDto } from './dto/get-document.dto'

@ApiTags('Документы')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @ApiOperation({
    summary: 'Получение документа',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
  })
  @Get()
  // @JwtAuthGuard()
  async get(@Query() query: GetDocumentDto, @Res() response: Response) {
    const fileData = await this.documentService.getOne(query.id)
    response.set({
      'Content-Disposition': `attachment; filename=${fileData.documentType}.png`,
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Content-Type': fileData.mimetype,
    })

    return fileData.stream.pipe(response)
  }
}
