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
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dtos/create-curso.dto';
import { UpdateCursoDto } from './dtos/update-curso.dto';

@Controller('curso')
export class CursoController {
  constructor(private cursoService: CursoService) {}

  @Get()
  @Render('curso/index')
  async inicial() {
    const cursos = await this.cursoService.findAll();

    return {
      titulo: 'Consulta de Cursos',
      cursos,
    };
  }

  @Get('create')
  @Render('curso/create')
  async createForm() {
    const departamentos = await this.cursoService.findDepartamentos();

    return {
      titulo: 'Criar Curso',
      departamentos,
    };
  }

  @Post('create')
  async store(@Body() dto: CreateCursoDto, @Res() res) {
    await this.cursoService.create(dto);
    return res.redirect('/curso');
  }

  @Get('view/:id')
  @Render('curso/view')
  async view(@Param('id') id: string) {
    const curso = await this.findCursoOrFail(id);

    return {
      titulo: 'Detalhes do Curso',
      curso,
    };
  }

  @Get('edit/:id')
  @Render('curso/edit')
  async editForm(@Param('id') id: string) {
    const curso = await this.findCursoOrFail(id);
    const departamentos = await this.cursoService.findDepartamentos();

    return {
      titulo: 'Editar Curso',
      curso,
      departamentos,
    };
  }

  @Post('edit/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCursoDto, @Res() res) {
    const numericId = this.parseId(id);
    await this.cursoService.update(numericId, dto);
    return res.redirect('/curso');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    const numericId = this.parseId(id);
    await this.cursoService.remove(numericId);
    return res.redirect('/curso');
  }

  private async findCursoOrFail(id: string) {
    const numericId = this.parseId(id);
    const curso = await this.cursoService.findOne(numericId);

    if (!curso) {
      throw new BadRequestException('Curso nao encontrado');
    }

    return curso;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
