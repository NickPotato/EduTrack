import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { PrismaService } from '../prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AnexosService {
  constructor(private prisma: PrismaService) {}

  async create(createAnexoDto: CreateAnexoDto) {
    const { materiaId, base64, fileName } = createAnexoDto;

    const materia = await this.prisma.materia.findUnique({ where: { id: materiaId } });
    if (!materia) {
      throw new BadRequestException('Matéria não encontrada!');
    }

    const ext = path.extname(fileName).toLowerCase();
    const extensoesValidas = ['.png', '.jpg', '.jpeg'];

    if (!extensoesValidas.includes(ext)) {
      throw new BadRequestException('Formato inválido! Apenas PNG e JPG são permitidos.');
    }

    const tipoArquivo = ext === '.png' ? 'image/png' : 'image/jpeg';

    const nomeFinal = `${Date.now()}${ext}`;
    
    const uploadDir = path.join(process.cwd(), 'anexos');
    const caminhoCompleto = path.join(uploadDir, nomeFinal);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    try {
      fs.writeFileSync(caminhoCompleto, buffer);
    } catch (error) {
      throw new BadRequestException('Erro ao salvar arquivo no disco');
    }

    return this.prisma.anexo.create({
      data: {
        nomeArquivo: nomeFinal,
        tipoArquivo: tipoArquivo,
        materiaId: materiaId,
      },
    });
  }

  async findOneBase64(id: number) {
    const anexo = await this.prisma.anexo.findUnique({ where: { id } });
    
    if (!anexo) {
      throw new NotFoundException('Anexo não encontrado no banco de dados.');
    }

    const filePath = path.join(process.cwd(), 'anexos', anexo.nomeArquivo);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo de imagem não encontrado no disco.');
    }

    const fileBuffer = fs.readFileSync(filePath);
    const base64String = fileBuffer.toString('base64');
    
    const ext = path.extname(anexo.nomeArquivo).replace('.', ''); 
    
    return {
      id: anexo.id,
      nomeArquivo: anexo.nomeArquivo,
      base64: `data:image/${ext};base64,${base64String}` 
    };
  }

  findAll() {
    return this.prisma.anexo.findMany();
  }
}