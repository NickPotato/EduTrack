import { ApiProperty } from '@nestjs/swagger';

export class CreateAnexoDto {
  @ApiProperty({ description: 'ID da matéria dona desse anexo', example: 1 })
  materiaId: number;

  @ApiProperty({ 
    description: 'Nome original ou extensão (opcional, usado para definir se é .png, .jpg)', 
    example: 'foto.png' 
  })
  fileName: string;

  @ApiProperty({ 
    description: 'String Base64 da imagem', 
  })
  base64: string;
}