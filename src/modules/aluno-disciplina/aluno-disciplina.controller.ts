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
import { AlunoDisciplinaService } from './aluno-disciplina.service';
import { CreateAlunoDisciplinaDto } from './dtos/create-aluno-disciplina.dto';
import { UpdateAlunoDisciplinaDto } from './dtos/update-aluno-disciplina.dto';

@Controller('aluno-disciplina')
export class AlunoDisciplinaController {
  constructor(private alunoDisciplinaService: AlunoDisciplinaService) {}

  @Get()
  @Render('aluno-disciplina/index')
  async inicial(): Promise<object> {
    const vinculos = await this.alunoDisciplinaService.findAll();

    return {
      titulo: 'Aluno x Disciplina',
      vinculos,
    };
  }

  @Get('create')
  @Render('aluno-disciplina/create')
  async createForm(): Promise<object> {
    const formOptions = await this.alunoDisciplinaService.findFormOptions();

    return {
      titulo: 'Vincular Aluno e Disciplina',
      ...formOptions,
    };
  }

  @Post('create')
  async store(@Body() dto: CreateAlunoDisciplinaDto, @Res() res) {
    await this.alunoDisciplinaService.create(dto);
    return res.redirect('/aluno-disciplina');
  }

  @Get('view/:alunoId/:disciplinaId')
  @Render('aluno-disciplina/view')
  async view(
    @Param('alunoId') alunoId: string,
    @Param('disciplinaId') disciplinaId: string,
  ): Promise<object> {
    const vinculo = await this.findVinculoOrFail(alunoId, disciplinaId);

    return {
      titulo: 'Detalhes do Vinculo',
      vinculo,
    };
  }

  @Get('edit/:alunoId/:disciplinaId')
  @Render('aluno-disciplina/edit')
  async editForm(
    @Param('alunoId') alunoId: string,
    @Param('disciplinaId') disciplinaId: string,
  ): Promise<object> {
    const vinculo = await this.findVinculoOrFail(alunoId, disciplinaId);

    return {
      titulo: 'Editar Nota',
      vinculo,
    };
  }

  @Post('edit/:alunoId/:disciplinaId')
  async update(
    @Param('alunoId') alunoId: string,
    @Param('disciplinaId') disciplinaId: string,
    @Body() dto: UpdateAlunoDisciplinaDto,
    @Res() res,
  ) {
    await this.alunoDisciplinaService.update(
      this.parseId(alunoId),
      this.parseId(disciplinaId),
      dto,
    );
    return res.redirect('/aluno-disciplina');
  }

  @Post('delete/:alunoId/:disciplinaId')
  async delete(
    @Param('alunoId') alunoId: string,
    @Param('disciplinaId') disciplinaId: string,
    @Res() res,
  ) {
    await this.alunoDisciplinaService.remove(
      this.parseId(alunoId),
      this.parseId(disciplinaId),
    );
    return res.redirect('/aluno-disciplina');
  }

  private async findVinculoOrFail(alunoId: string, disciplinaId: string) {
    const vinculo = await this.alunoDisciplinaService.findOne(
      this.parseId(alunoId),
      this.parseId(disciplinaId),
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
