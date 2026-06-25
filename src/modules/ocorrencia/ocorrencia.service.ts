import { Injectable } from '@nestjs/common';
import { Ocorrencia } from './ocorrencia.entity';
import { Aluno } from '../aluno/aluno.entity';
import { CreateOcorrenciaDto } from './dtos/create-ocorrencia.dto';
import { UpdateOcorrenciaDto } from './dtos/update-ocorrencia.dto';

@Injectable()
export class OcorrenciaService {
  async findAll(): Promise<Ocorrencia[]> {
    return Ocorrencia.find({
      relations: {
        aluno: true,
      },
    });
  }

  async findOne(id: number): Promise<Ocorrencia | null> {
    return Ocorrencia.findOne({
      where: { id_oco: id },
      relations: {
        aluno: true,
      },
    });
  }

  async findAlunos(): Promise<Aluno[]> {
    return Aluno.find();
  }

  async create(dados: CreateOcorrenciaDto): Promise<Ocorrencia> {
    const ocorrencia = new Ocorrencia();

    Object.assign(ocorrencia, {
      tipo_oco: dados.tipo_oco,
      descricao_oco: dados.descricao_oco,
      data_oco: dados.data_oco,
      aluno: { id_alu: dados.aluno },
    });

    return ocorrencia.save();
  }

  async update(
    id: number,
    dados: UpdateOcorrenciaDto,
  ): Promise<Ocorrencia | null> {
    const ocorrencia = await this.findOne(id);

    if (!ocorrencia) return null;

    Object.assign(ocorrencia, {
      tipo_oco: dados.tipo_oco ?? ocorrencia.tipo_oco,
      descricao_oco: dados.descricao_oco ?? ocorrencia.descricao_oco,
      data_oco: dados.data_oco ?? ocorrencia.data_oco,
      aluno: dados.aluno ? { id_alu: dados.aluno } : ocorrencia.aluno,
    });

    return ocorrencia.save();
  }

  async remove(id: number): Promise<Ocorrencia | null> {
    const ocorrencia = await this.findOne(id);

    if (!ocorrencia) return null;

    return ocorrencia.remove();
  }
}
