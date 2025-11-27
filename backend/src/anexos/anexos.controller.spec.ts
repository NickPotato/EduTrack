import { Test, TestingModule } from '@nestjs/testing';
import { AnexosController } from './anexos.controller';
import { AnexosService } from './anexos.service';

describe('AnexosController', () => {
  let controller: AnexosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnexosController],
      providers: [AnexosService],
    }).compile();

    controller = module.get<AnexosController>(AnexosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
