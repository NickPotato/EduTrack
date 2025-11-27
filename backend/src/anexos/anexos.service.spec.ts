import { Test, TestingModule } from '@nestjs/testing';
import { AnexosService } from './anexos.service';

describe('AnexosService', () => {
  let service: AnexosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnexosService],
    }).compile();

    service = module.get<AnexosService>(AnexosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
