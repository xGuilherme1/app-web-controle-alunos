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
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dtos/create-aluno.dto';
import { UpdateAlunoDto } from './dtos/update-aluno.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private alunoService: AlunoService) {}

  @Get()
  @Render('aluno/index')
  async inicial(): Promise<object> {
    const alunos = await this.alunoService.findAll();

    return {
      titulo: 'Consulta de Alunos',
      alunos,
    };
  }

  @Get('create')
  @Render('aluno/create')
  async createForm(): Promise<object> {
    const formOptions = await this.alunoService.findFormOptions();

    return {
      titulo: 'Criar Aluno',
      ...formOptions,
    };
  }

  @Post('create')
  async store(@Body() dto: CreateAlunoDto, @Res() res) {
    await this.alunoService.create(dto);
    return res.redirect('/aluno');
  }

  @Get('view/:id')
  @Render('aluno/view')
  async view(@Param('id') id: string): Promise<object> {
    const aluno = await this.findAlunoOrFail(id);

    return {
      titulo: 'Detalhes do Aluno',
      aluno,
    };
  }

  @Get('edit/:id')
  @Render('aluno/edit')
  async editForm(@Param('id') id: string): Promise<object> {
    const aluno = await this.findAlunoOrFail(id);
    const formOptions = await this.alunoService.findFormOptions();

    return {
      titulo: 'Editar Aluno',
      aluno,
      ...formOptions,
    };
  }

  @Post('edit/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateAlunoDto, @Res() res) {
    const numericId = this.parseId(id);
    await this.alunoService.update(numericId, dto);
    return res.redirect('/aluno');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    const numericId = this.parseId(id);
    await this.alunoService.remove(numericId);
    return res.redirect('/aluno');
  }

  private async findAlunoOrFail(id: string) {
    const numericId = this.parseId(id);
    const aluno = await this.alunoService.findOne(numericId);

    if (!aluno) {
      throw new BadRequestException('Aluno nao encontrado');
    }

    return aluno;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
