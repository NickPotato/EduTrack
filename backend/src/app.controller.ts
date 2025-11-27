import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Verifica status da API', 
    description: 'Retorna se o servidor está online e o horário atual.' 
  })
  getHealth() {
    return this.appService.getHealth();
  }
}