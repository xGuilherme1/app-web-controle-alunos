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
import { AlunoEventoService } from './aluno-evento.service';
import { CreateAlunoEventoDto } from './dtos/create-aluno-evento.dto';
import { UpdateAlunoEventoDto } from './dtos/update-aluno-evento.dto';

@Controller('aluno-evento')
export class AlunoEventoController {
  constructor(private alunoEventoService: AlunoEventoService) {}

  @Get()
  @Render('aluno-evento/index')
  async inicial(): Promise<object> {
    const vinculos = await this.alunoEventoService.findAll();

    return {
      titulo: 'Aluno x Evento',
      vinculos,
    };
  }

  @Get('create')
  @Render('aluno-evento/create')
  async createForm(): Promise<object> {
    const formOptions = await this.alunoEventoService.findFormOptions();

    return {
      titulo: 'Vincular Aluno e Evento',
      ...formOptions,
    };
  }

  @Post('create')
  async store(@Body() dto: CreateAlunoEventoDto, @Res() res) {
    await this.alunoEventoService.create(dto);
    return res.redirect('/aluno-evento');
  }

  @Get('view/:alunoId/:eventoId')
  @Render('aluno-evento/view')
  async view(
    @Param('alunoId') alunoId: string,
    @Param('eventoId') eventoId: string,
  ): Promise<object> {
    const vinculo = await this.findVinculoOrFail(alunoId, eventoId);

    return {
      titulo: 'Detalhes do Vinculo',
      vinculo,
    };
  }

  @Get('edit/:alunoId/:eventoId')
  @Render('aluno-evento/edit')
  async editForm(
    @Param('alunoId') alunoId: string,
    @Param('eventoId') eventoId: string,
  ): Promise<object> {
    const vinculo = await this.findVinculoOrFail(alunoId, eventoId);

    return {
      titulo: 'Editar Presenca',
      vinculo,
    };
  }

  @Post('edit/:alunoId/:eventoId')
  async update(
    @Param('alunoId') alunoId: string,
    @Param('eventoId') eventoId: string,
    @Body() dto: UpdateAlunoEventoDto,
    @Res() res,
  ) {
    await this.alunoEventoService.update(
      this.parseId(alunoId),
      this.parseId(eventoId),
      dto,
    );
    return res.redirect('/aluno-evento');
  }

  @Post('delete/:alunoId/:eventoId')
  async delete(
    @Param('alunoId') alunoId: string,
    @Param('eventoId') eventoId: string,
    @Res() res,
  ) {
    await this.alunoEventoService.remove(
      this.parseId(alunoId),
      this.parseId(eventoId),
    );
    return res.redirect('/aluno-evento');
  }

  private async findVinculoOrFail(alunoId: string, eventoId: string) {
    const vinculo = await this.alunoEventoService.findOne(
      this.parseId(alunoId),
      this.parseId(eventoId),
    );

    if (!vinculo) {
      throw new BadRequestException('Vinculo nao encontrado');
    }

    return vinculo;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
