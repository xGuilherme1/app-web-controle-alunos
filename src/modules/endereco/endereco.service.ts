import { Injectable } from '@nestjs/common';
import { Endereco } from './endereco.entity';
import { CreateEnderecoDto } from './dtos/create-endereco.dto';
import { UpdateEnderecoDto } from './dtos/update-endereco.dto';

@Injectable()
export class EnderecoService {
  async findAll(): Promise<Endereco[]> {
    return Endereco.find();
  }

  async findOne(id: number): Promise<Endereco | null> {
    return Endereco.findOne({
      where: { id_end: id },
    });
  }

  async create(dados: CreateEnderecoDto): Promise<Endereco> {
    const endereco = new Endereco();

    Object.assign(endereco, {
      logradouro_end: dados.logradouro_end,
      numero_end: dados.numero_end,
      cidade_end: dados.cidade_end,
      estado_end: dados.estado_end,
    });

    return endereco.save();
  }

  async update(id: number, dados: UpdateEnderecoDto): Promise<Endereco | null> {
    const endereco = await this.findOne(id);

    if (!endereco) return null;

    Object.assign(endereco, dados);

    return endereco.save();
  }

  async remove(id: number): Promise<Endereco | null> {
    const endereco = await this.findOne(id);

    if (!endereco) return null;

    return endereco.remove();
  }
}
