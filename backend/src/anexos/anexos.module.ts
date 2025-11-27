import { Module } from '@nestjs/common';
import { AnexosService } from './anexos.service';
import { AnexosController } from './anexos.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AnexosController],
  providers: [AnexosService, PrismaService],
})
export class AnexosModule {}
