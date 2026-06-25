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
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dtos/create-professor.dto';
import { UpdateProfessorDto } from './dtos/update-professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private professorService: ProfessorService) {}

  @Get()
  @Render('professor/index')
  async inicial(): Promise<object> {
    const professores = await this.professorService.findAll();

    return {
      titulo: 'Consulta de Professores',
      professores,
    };
  }

  @Get('create')
  @Render('professor/create')
  createForm(): object {
    return {
      titulo: 'Criar Professor',
    };
  }

  @Post('create')
  async store(@Body() dto: CreateProfessorDto, @Res() res) {
    await this.professorService.create(dto);
    return res.redirect('/professor');
  }

  @Get('view/:id')
  @Render('professor/view')
  async view(@Param('id') id: string): Promise<object> {
    const professor = await this.findProfessorOrFail(id);

    return {
      titulo: 'Detalhes do Professor',
      professor,
    };
  }

  @Get('edit/:id')
  @Render('professor/edit')
  async editForm(@Param('id') id: string): Promise<object> {
    const professor = await this.findProfessorOrFail(id);

    return {
      titulo: 'Editar Professor',
      professor,
    };
  }

  @Post('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProfessorDto,
    @Res() res,
  ) {
    const numericId = this.parseId(id);
    await this.professorService.update(numericId, dto);
    return res.redirect('/professor');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    const numericId = this.parseId(id);
    await this.professorService.remove(numericId);
    return res.redirect('/professor');
  }

  private async findProfessorOrFail(id: string) {
    const numericId = this.parseId(id);
    const professor = await this.professorService.findOne(numericId);

    if (!professor) {
      throw new BadRequestException('Professor nao encontrado');
    }

    return professor;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
