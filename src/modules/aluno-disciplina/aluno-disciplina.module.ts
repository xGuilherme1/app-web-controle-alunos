import { Module } from '@nestjs/common';
import { AlunoDisciplinaController } from './aluno-disciplina.controller';
import { AlunoDisciplinaService } from './aluno-disciplina.service';

@Module({
  controllers: [AlunoDisciplinaController],
  providers: [AlunoDisciplinaService]
})
export class AlunoDisciplinaModule {}
