import { ApiProperty } from '@nestjs/swagger';

export class CreateMateriaDto {
  @ApiProperty({
    description: 'O título da matéria',
  })
  titulo: string;

  @ApiProperty({
    description: 'O conteúdo completo da matéria',
  })
  texto: string;

  @ApiProperty({
    description: 'Link para conteúdo externo',
    required: false,
  })
  linkAuxiliar?: string;
}