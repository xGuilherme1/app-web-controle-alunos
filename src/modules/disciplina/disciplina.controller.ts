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
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dtos/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dtos/update-disciplina.dto';

@Controller('disciplina')
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  @Get()
  @Render('disciplina/index')
  async inicial(): Promise<object> {
    const disciplinas = await this.disciplinaService.findAll();

    return {
      titulo: 'Consulta de Disciplinas',
      disciplinas,
    };
  }

  @Get('create')
  @Render('disciplina/create')
  async createForm(): Promise<object> {
    const professores = await this.disciplinaService.findProfessores();

    return {
      titulo: 'Criar Disciplina',
      professores,
    };
  }

  @Post('create')
  async store(@Body() dto: CreateDisciplinaDto, @Res() res) {
    await this.disciplinaService.create(dto);
    return res.redirect('/disciplina');
  }

  @Get('view/:id')
  @Render('disciplina/view')
  async view(@Param('id') id: string): Promise<object> {
    const disciplina = await this.findDisciplinaOrFail(id);

    return {
      titulo: 'Detalhes da Disciplina',
      disciplina,
    };
  }

  @Get('edit/:id')
  @Render('disciplina/edit')
  async editForm(@Param('id') id: string): Promise<object> {
    const disciplina = await this.findDisciplinaOrFail(id);
    const professores = await this.disciplinaService.findProfessores();

    return {
      titulo: 'Editar Disciplina',
      disciplina,
      professores,
    };
  }

  @Post('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDisciplinaDto,
    @Res() res,
  ) {
    const numericId = this.parseId(id);
    await this.disciplinaService.update(numericId, dto);
    return res.redirect('/disciplina');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    const numericId = this.parseId(id);
    await this.disciplinaService.remove(numericId);
    return res.redirect('/disciplina');
  }

  private async findDisciplinaOrFail(id: string) {
    const numericId = this.parseId(id);
    const disciplina = await this.disciplinaService.findOne(numericId);

    if (!disciplina) {
      throw new BadRequestException('Disciplina nao encontrada');
    }

    return disciplina;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
