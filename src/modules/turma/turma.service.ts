import { Injectable } from '@nestjs/common';
import { Turma } from './turma.entity';
import { CreateTurmaDto } from './dtos/create-turma.dto';
import { UpdateTurmaDto } from './dtos/update-turma.dto';

@Injectable()
export class TurmaService {
  async findAll(): Promise<Turma[]> {
    return Turma.find();
  }

  async findOne(id: number): Promise<Turma | null> {
    return Turma.findOne({
      where: { id_tur: id },
    });
  }

  async create(dados: CreateTurmaDto): Promise<Turma> {
    const turma = new Turma();

    Object.assign(turma, {
      nome_tur: dados.nome_tur,
      ano_tur: dados.ano_tur,
    });

    return turma.save();
  }

  async update(id: number, dados: UpdateTurmaDto): Promise<Turma | null> {
    const turma = await this.findOne(id);

    if (!turma) return null;

    Object.assign(turma, dados);

    return turma.save();
  }

  async remove(id: number): Promise<Turma | null> {
    const turma = await this.findOne(id);

    if (!turma) return null;

    return turma.remove();
  }
}
