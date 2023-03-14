import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
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
  @Post()
  @JwtAuthGuard()
  async create(@Body() dto: GetDocumentDto, @Res() response: Response) {
    const fileData = await this.documentService.getOne(dto.id)
    response.set({
      'Content-Disposition': `attachment; filename="${fileData.documentType}_${fileData.fileName}"`,
      'Content-Type': fileData.mimetype,
    })

    return fileData.stream.pipe(response)
  }
}
