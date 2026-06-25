import { Injectable } from '@nestjs/common';
import { AlunoDisciplina } from './aluno-disciplina.entity';
import { Aluno } from '../aluno/aluno.entity';
import { Disciplina } from '../disciplina/disciplina.entity';
import { CreateAlunoDisciplinaDto } from './dtos/create-aluno-disciplina.dto';
import { UpdateAlunoDisciplinaDto } from './dtos/update-aluno-disciplina.dto';

@Injectable()
export class AlunoDisciplinaService {
  async findAll(): Promise<AlunoDisciplina[]> {
    return AlunoDisciplina.find({
      relations: {
        aluno: true,
        disciplina: true,
      },
    });
  }

  async findOne(
    alunoId: number,
    disciplinaId: number,
  ): Promise<AlunoDisciplina | null> {
    return AlunoDisciplina.findOne({
      where: { alunoId, disciplinaId },
      relations: {
        aluno: true,
        disciplina: true,
      },
    });
  }

  async findFormOptions() {
    const [alunos, disciplinas] = await Promise.all([
      Aluno.find(),
      Disciplina.find({ relations: { professor: true } }),
    ]);

    return {
      alunos,
      disciplinas,
    };
  }

  async create(dados: CreateAlunoDisciplinaDto): Promise<AlunoDisciplina> {
    const vinculo = new AlunoDisciplina();

    Object.assign(vinculo, {
      alunoId: dados.aluno,
      disciplinaId: dados.disciplina,
      aluno: { id_alu: dados.aluno },
      disciplina: { id_dis: dados.disciplina },
      nota: dados.nota,
    });

    return vinculo.save();
  }

  async update(
    alunoId: number,
    disciplinaId: number,
    dados: UpdateAlunoDisciplinaDto,
  ): Promise<AlunoDisciplina | null> {
    const vinculo = await this.findOne(alunoId, disciplinaId);

    if (!vinculo) return null;

    Object.assign(vinculo, {
      nota: dados.nota ?? vinculo.nota,
    });

    return vinculo.save();
  }

  async remove(
    alunoId: number,
    disciplinaId: number,
  ): Promise<AlunoDisciplina | null> {
    const vinculo = await this.findOne(alunoId, disciplinaId);

    if (!vinculo) return null;

    return vinculo.remove();
  }
}
