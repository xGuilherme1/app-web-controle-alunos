import { Injectable } from '@nestjs/common';
import { Disciplina } from './disciplina.entity';
import { Professor } from '../professor/professor.entity';
import { CreateDisciplinaDto } from './dtos/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dtos/update-disciplina.dto';

@Injectable()
export class DisciplinaService {
  async findAll(): Promise<Disciplina[]> {
    return Disciplina.find({
      relations: {
        professor: true,
      },
    });
  }

  async findOne(id: number): Promise<Disciplina | null> {
    return Disciplina.findOne({
      where: { id_dis: id },
      relations: {
        professor: true,
      },
    });
  }

  async findProfessores(): Promise<Professor[]> {
    return Professor.find();
  }

  async create(dados: CreateDisciplinaDto): Promise<Disciplina> {
    const disciplina = new Disciplina();

    Object.assign(disciplina, {
      nome_dis: dados.nome_dis,
      professor: { id_pro: dados.professor },
    });

    return disciplina.save();
  }

  async update(
    id: number,
    dados: UpdateDisciplinaDto,
  ): Promise<Disciplina | null> {
    const disciplina = await this.findOne(id);

    if (!disciplina) return null;

    Object.assign(disciplina, {
      nome_dis: dados.nome_dis ?? disciplina.nome_dis,
      professor: dados.professor
        ? { id_pro: dados.professor }
        : disciplina.professor,
    });

    return disciplina.save();
  }

  async remove(id: number): Promise<Disciplina | null> {
    const disciplina = await this.findOne(id);

    if (!disciplina) return null;

    return disciplina.remove();
  }
}
