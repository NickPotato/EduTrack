import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriasModule } from './materias/materias.module';
import { AnexosModule } from './anexos/anexos.module';

@Module({
  imports: [MateriasModule, AnexosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
