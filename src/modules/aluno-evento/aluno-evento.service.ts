import { Injectable } from '@nestjs/common';
import { AlunoEvento } from './aluno-evento.entity';
import { Aluno } from '../aluno/aluno.entity';
import { Evento } from '../evento/evento.entity';
import { CreateAlunoEventoDto } from './dtos/create-aluno-evento.dto';
import { UpdateAlunoEventoDto } from './dtos/update-aluno-evento.dto';

@Injectable()
export class AlunoEventoService {
  async findAll(): Promise<AlunoEvento[]> {
    return AlunoEvento.find({
      relations: {
        aluno: true,
        evento: true,
      },
    });
  }

  async findOne(alunoId: number, eventoId: number): Promise<AlunoEvento | null> {
    return AlunoEvento.findOne({
      where: { alunoId, eventoId },
      relations: {
        aluno: true,
        evento: true,
      },
    });
  }

  async findFormOptions() {
    const [alunos, eventos] = await Promise.all([Aluno.find(), Evento.find()]);

    return {
      alunos,
      eventos,
    };
  }

  async create(dados: CreateAlunoEventoDto): Promise<AlunoEvento> {
    const vinculo = new AlunoEvento();

    Object.assign(vinculo, {
      alunoId: dados.aluno,
      eventoId: dados.evento,
      aluno: { id_alu: dados.aluno },
      evento: { id_eve: dados.evento },
      presenca: dados.presenca === true,
    });

    return vinculo.save();
  }

  async update(
    alunoId: number,
    eventoId: number,
    dados: UpdateAlunoEventoDto,
  ): Promise<AlunoEvento | null> {
    const vinculo = await this.findOne(alunoId, eventoId);

    if (!vinculo) return null;

    Object.assign(vinculo, {
      presenca: dados.presenca === true,
    });

    return vinculo.save();
  }

  async remove(alunoId: number, eventoId: number): Promise<AlunoEvento | null> {
    const vinculo = await this.findOne(alunoId, eventoId);

    if (!vinculo) return null;

    return vinculo.remove();
  }
}
