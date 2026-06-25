import { Injectable } from '@nestjs/common';
import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dtos/create-professor.dto';
import { UpdateProfessorDto } from './dtos/update-professor.dto';

@Injectable()
export class ProfessorService {
  async findAll(): Promise<Professor[]> {
    return Professor.find();
  }

  async findOne(id: number): Promise<Professor | null> {
    return Professor.findOne({
      where: { id_pro: id },
    });
  }

  async create(dados: CreateProfessorDto): Promise<Professor> {
    const professor = new Professor();

    Object.assign(professor, {
      nome_pro: dados.nome_pro,
      titulacao_pro: dados.titulacao_pro,
    });

    return professor.save();
  }

  async update(id: number, dados: UpdateProfessorDto): Promise<Professor | null> {
    const professor = await this.findOne(id);

    if (!professor) return null;

    Object.assign(professor, dados);

    return professor.save();
  }

  async remove(id: number): Promise<Professor | null> {
    const professor = await this.findOne(id);

    if (!professor) return null;

    return professor.remove();
  }
}
