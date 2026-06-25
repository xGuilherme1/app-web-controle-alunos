import { Module } from '@nestjs/common';
import { AlunoEventoController } from './aluno-evento.controller';
import { AlunoEventoService } from './aluno-evento.service';

@Module({
  controllers: [AlunoEventoController],
  providers: [AlunoEventoService]
})
export class AlunoEventoModule {}
