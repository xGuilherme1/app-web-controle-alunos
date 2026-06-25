import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { DepartamentoModule } from './modules/departamento/departamento.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { EventoModule } from './modules/evento/evento.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { TurmaModule } from './modules/turma/turma.module';
import { DisciplinaModule } from './modules/disciplina/disciplina.module';
import { CursoModule } from './modules/curso/curso.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { OcorrenciaModule } from './modules/ocorrencia/ocorrencia.module';
import { AlunoDisciplinaModule } from './modules/aluno-disciplina/aluno-disciplina.module';
import { AlunoEventoModule } from './modules/aluno-evento/aluno-evento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DepartamentoModule,
    ProfessorModule,
    EventoModule,
    EnderecoModule,
    TurmaModule,
    DisciplinaModule,
    CursoModule,
    AlunoModule,
    OcorrenciaModule,
    AlunoDisciplinaModule,
    AlunoEventoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
