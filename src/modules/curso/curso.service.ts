import { Injectable } from '@nestjs/common';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './dtos/create-curso.dto';
import { UpdateCursoDto } from './dtos/update-curso.dto';
import { Departamento } from '../departamento/departamento.entity';

@Injectable()
export class CursoService {

  async findAll(): Promise<Curso[]> {
    return Curso.find({
      relations: { departamento: true },
    });
  }

  async findDepartamentos(): Promise<Departamento[]> {
    return Departamento.find();
  }

  async findOne(id: number) {
  return Curso.findOne({
    where: { id_cur: id },
    relations: {
      departamento: true
    }
  });
  }

  async create(dados: CreateCursoDto) {
  const curso = new Curso();

  Object.assign(curso, {
    nome_cur: dados.nome_cur,
    carga_horaria_cur: dados.carga_horaria_cur,
    departamento: { id_dep: dados.departamento }
  });

  return curso.save();
  }

  async update(id: number, dados: UpdateCursoDto): Promise<Curso | null> {
    const curso = await this.findOne(id);

    if (!curso) return null;

    Object.assign(curso, {
      ...dados,
      departamento: dados.departamento
        ? { id_dep: dados.departamento }
        : curso.departamento,
    });

    return curso.save();
  }

  async remove(id: number): Promise<Curso | null> {
    const curso = await this.findOne(id);

    if (!curso) return null;

    return curso.remove();
  }
}
