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
import { OcorrenciaService } from './ocorrencia.service';
import { CreateOcorrenciaDto } from './dtos/create-ocorrencia.dto';
import { UpdateOcorrenciaDto } from './dtos/update-ocorrencia.dto';

@Controller('ocorrencia')
export class OcorrenciaController {
  constructor(private ocorrenciaService: OcorrenciaService) {}

  @Get()
  @Render('ocorrencia/index')
  async inicial(): Promise<object> {
    const ocorrencias = await this.ocorrenciaService.findAll();

    return {
      titulo: 'Consulta de Ocorrencias',
      ocorrencias,
    };
  }

  @Get('create')
  @Render('ocorrencia/create')
  async createForm(): Promise<object> {
    const alunos = await this.ocorrenciaService.findAlunos();

    return {
      titulo: 'Criar Ocorrencia',
      alunos,
    };
  }

  @Post('create')
  async store(@Body() dto: CreateOcorrenciaDto, @Res() res) {
    await this.ocorrenciaService.create(dto);
    return res.redirect('/ocorrencia');
  }

  @Get('view/:id')
  @Render('ocorrencia/view')
  async view(@Param('id') id: string): Promise<object> {
    const ocorrencia = await this.findOcorrenciaOrFail(id);

    return {
      titulo: 'Detalhes da Ocorrencia',
      ocorrencia,
    };
  }

  @Get('edit/:id')
  @Render('ocorrencia/edit')
  async editForm(@Param('id') id: string): Promise<object> {
    const ocorrencia = await this.findOcorrenciaOrFail(id);
    const alunos = await this.ocorrenciaService.findAlunos();

    return {
      titulo: 'Editar Ocorrencia',
      ocorrencia,
      alunos,
    };
  }

  @Post('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOcorrenciaDto,
    @Res() res,
  ) {
    const numericId = this.parseId(id);
    await this.ocorrenciaService.update(numericId, dto);
    return res.redirect('/ocorrencia');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    const numericId = this.parseId(id);
    await this.ocorrenciaService.remove(numericId);
    return res.redirect('/ocorrencia');
  }

  private async findOcorrenciaOrFail(id: string) {
    const numericId = this.parseId(id);
    const ocorrencia = await this.ocorrenciaService.findOne(numericId);

    if (!ocorrencia) {
      throw new BadRequestException('Ocorrencia nao encontrada');
    }

    return ocorrencia;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
