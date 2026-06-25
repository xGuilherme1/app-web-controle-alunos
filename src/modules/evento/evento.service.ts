import { Injectable } from '@nestjs/common';
import { Evento } from './evento.entity';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { UpdateEventoDto } from './dtos/update-evento.dto';

@Injectable()
export class EventoService {
  async findAll(): Promise<Evento[]> {
    return Evento.find();
  }

  async findOne(id: number): Promise<Evento | null> {
    return Evento.findOne({
      where: { id_eve: id },
    });
  }

  async create(dados: CreateEventoDto): Promise<Evento> {
    const evento = new Evento();

    Object.assign(evento, {
      titulo_eve: dados.titulo_eve,
      data_eve: dados.data_eve,
      local_eve: dados.local_eve,
    });

    return evento.save();
  }

  async update(id: number, dados: UpdateEventoDto): Promise<Evento | null> {
    const evento = await this.findOne(id);

    if (!evento) return null;

    Object.assign(evento, {
      titulo_eve: dados.titulo_eve ?? evento.titulo_eve,
      data_eve: dados.data_eve ?? evento.data_eve,
      local_eve: dados.local_eve ?? evento.local_eve,
    });

    return evento.save();
  }

  async remove(id: number): Promise<Evento | null> {
    const evento = await this.findOne(id);

    if (!evento) return null;

    return evento.remove();
  }
}
