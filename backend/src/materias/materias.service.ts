import { Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  create(createMateriaDto: CreateMateriaDto) {
    return this.prisma.materia.create({
      data: createMateriaDto,
    });
  }

  findAll() {
    return this.prisma.materia.findMany({
      orderBy: { id: 'desc' },
      include: { anexos: true }
    });
  }

  findOne(id: number) {
    return this.prisma.materia.findUnique({
      where: { id },
      include: { anexos: true }
    });
  }

  update(id: number, updateMateriaDto: UpdateMateriaDto) {
    return this.prisma.materia.update({
      where: { id },
      data: updateMateriaDto,
    });
  }

  remove(id: number) {
    return this.prisma.materia.delete({
      where: { id },
    });
  }
}