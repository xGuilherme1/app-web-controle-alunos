import { Injectable } from '@nestjs/common';
import { Aluno } from './aluno.entity';
import { CreateAlunoDto } from './dtos/create-aluno.dto';
import { UpdateAlunoDto } from './dtos/update-aluno.dto';
import { Curso } from '../curso/curso.entity';
import { Turma } from '../turma/turma.entity';
import { Endereco } from '../endereco/endereco.entity';

@Injectable()
export class AlunoService {
  async findAll(): Promise<Aluno[]> {
    return Aluno.find({
      relations: {
        curso: true,
        turma: true,
        endereco: true,
      },
    });
  }

  async findOne(id: number): Promise<Aluno | null> {
    return Aluno.findOne({
      where: { id_alu: id },
      relations: {
        curso: true,
        turma: true,
        endereco: true,
      },
    });
  }

  async findFormOptions() {
    const [cursos, turmas, enderecos] = await Promise.all([
      Curso.find(),
      Turma.find(),
      Endereco.find(),
    ]);

    return {
      cursos,
      turmas,
      enderecos,
    };
  }

  async create(dados: CreateAlunoDto): Promise<Aluno> {
    const aluno = new Aluno();

    Object.assign(aluno, {
      nome_alu: dados.nome_alu,
      data_nascimento_alu: dados.data_nascimento_alu,
      curso: { id_cur: dados.curso },
      turma: { id_tur: dados.turma },
      endereco: { id_end: dados.endereco },
    });

    return aluno.save();
  }

  async update(id: number, dados: UpdateAlunoDto): Promise<Aluno | null> {
    const aluno = await this.findOne(id);

    if (!aluno) return null;

    Object.assign(aluno, {
      nome_alu: dados.nome_alu ?? aluno.nome_alu,
      data_nascimento_alu:
        dados.data_nascimento_alu ?? aluno.data_nascimento_alu,
      curso: dados.curso ? { id_cur: dados.curso } : aluno.curso,
      turma: dados.turma ? { id_tur: dados.turma } : aluno.turma,
      endereco: dados.endereco ? { id_end: dados.endereco } : aluno.endereco,
    });

    return aluno.save();
  }

  async remove(id: number): Promise<Aluno | null> {
    const aluno = await this.findOne(id);

    if (!aluno) return null;

    return aluno.remove();
  }
}
