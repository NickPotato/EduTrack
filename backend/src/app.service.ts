import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'API Online 🚀',
      timestamp: new Date().toISOString(),
      versao: '1.0.0'
    };
  }
}