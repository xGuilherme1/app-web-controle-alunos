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
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dtos/create-turma.dto';
import { UpdateTurmaDto } from './dtos/update-turma.dto';

@Controller('turma')
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  @Get()
  @Render('turma/index')
  async inicial(): Promise<object> {
    const turmas = await this.turmaService.findAll();

    return {
      titulo: 'Consulta de Turmas',
      turmas,
    };
  }

  @Get('create')
  @Render('turma/create')
  createForm(): object {
    return {
      titulo: 'Criar Turma',
    };
  }

  @Post('create')
  async store(@Body() dto: CreateTurmaDto, @Res() res) {
    await this.turmaService.create(dto);
    return res.redirect('/turma');
  }

  @Get('view/:id')
  @Render('turma/view')
  async view(@Param('id') id: string): Promise<object> {
    const turma = await this.findTurmaOrFail(id);

    return {
      titulo: 'Detalhes da Turma',
      turma,
    };
  }

  @Get('edit/:id')
  @Render('turma/edit')
  async editForm(@Param('id') id: string): Promise<object> {
    const turma = await this.findTurmaOrFail(id);

    return {
      titulo: 'Editar Turma',
      turma,
    };
  }

  @Post('edit/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTurmaDto, @Res() res) {
    const numericId = this.parseId(id);
    await this.turmaService.update(numericId, dto);
    return res.redirect('/turma');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    const numericId = this.parseId(id);
    await this.turmaService.remove(numericId);
    return res.redirect('/turma');
  }

  private async findTurmaOrFail(id: string) {
    const numericId = this.parseId(id);
    const turma = await this.turmaService.findOne(numericId);

    if (!turma) {
      throw new BadRequestException('Turma nao encontrada');
    }

    return turma;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
