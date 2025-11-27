import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Matérias')
@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova matéria' })
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as matérias' })
  findAll() {
    return this.materiasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma matéria pelo ID' })
  findOne(@Param('id') id: string) {
    return this.materiasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma matéria existente' })
  update(@Param('id') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiasService.update(+id, updateMateriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma matéria' })
  remove(@Param('id') id: string) {
    return this.materiasService.remove(+id);
  }
}