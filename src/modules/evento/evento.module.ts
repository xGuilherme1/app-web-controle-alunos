import { Module } from '@nestjs/common';
import { EventoController } from './evento.controller';
import { EventoService } from './evento.service';

@Module({
  imports: [],
  controllers: [EventoController],
  providers: [EventoService],
  exports: []
})
export class EventoModule {}
