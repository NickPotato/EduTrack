import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AnexosService } from './anexos.service';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Anexos')
@Controller('anexos')
export class AnexosController {
  constructor(private readonly anexosService: AnexosService) {}

  @Post()
  @ApiOperation({ summary: 'Faz upload de um anexo em Base64' })
  create(@Body() createAnexoDto: CreateAnexoDto) {
    return this.anexosService.create(createAnexoDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna a imagem em Base64 pelo ID' })
  findOne(@Param('id') id: string) {
    return this.anexosService.findOneBase64(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os anexos' })
  findAll() {
    return this.anexosService.findAll();
  }
}