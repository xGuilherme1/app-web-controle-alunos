import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { UpdateEventoDto } from './dtos/update-evento.dto';

@Controller('evento')
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get()
  @Render('evento/index')
  async inicial(): Promise<object> {
    const eventos = await this.eventoService.findAll();

    return {
      titulo: 'Consulta de Eventos',
      eventos,
    };
  }

  @Get('create')
  @Render('evento/create')
  createForm(): object {
    return {
      titulo: 'Criar Evento',
    };
  }

  @Post('create')
  async store(@Body() dto: CreateEventoDto, @Res() res) {
    await this.eventoService.create(dto);
    return res.redirect('/evento');
  }

  @Get('view/:id')
  @Render('evento/view')
  async view(@Param('id') id: string): Promise<object> {
    const evento = await this.findEventoOrFail(id);

    return {
      titulo: 'Detalhes do Evento',
      evento,
    };
  }

  @Get('edit/:id')
  @Render('evento/edit')
  async editForm(@Param('id') id: string): Promise<object> {
    const evento = await this.findEventoOrFail(id);

    return {
      titulo: 'Editar Evento',
      evento,
    };
  }

  @Post('edit/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateEventoDto, @Res() res) {
    const numericId = this.parseId(id);
    await this.eventoService.update(numericId, dto);
    return res.redirect('/evento');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    const numericId = this.parseId(id);
    await this.eventoService.remove(numericId);
    return res.redirect('/evento');
  }

  private async findEventoOrFail(id: string) {
    const numericId = this.parseId(id);
    const evento = await this.eventoService.findOne(numericId);

    if (!evento) {
      throw new BadRequestException('Evento nao encontrado');
    }

    return evento;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
