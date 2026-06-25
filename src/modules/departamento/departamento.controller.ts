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
import { DepartamentoService } from "./departamento.service";
import { CreateDepartamentoDto } from './dtos/create-departamento.dto';
import { UpdateDepartamentoDto } from './dtos/update-departamento.dto';

@Controller('departamento')
export class DepartamentoController {

    constructor(private departamentoService: DepartamentoService) {}
    
    @Get()
    @Render('departamento/index')
    async inicial(): Promise<object> {
        const departamentos = await this.departamentoService.findAll();
    
        return {
            titulo: 'Consulta de Departamentos',
            departamentos
        }
    }

    @Get('create')
    @Render('departamento/create')
    createForm(): object {
        return {
            titulo: 'Criar Departamento',
        };
    }

    @Post('create')
    async store(@Body() dto: CreateDepartamentoDto, @Res() res) {
        await this.departamentoService.create(dto);
        return res.redirect('/departamento');
    }

    @Get('view/:id')
    @Render('departamento/view')
    async view(@Param('id') id: string): Promise<object> {
        const departamento = await this.findDepartamentoOrFail(id);

        return {
            titulo: 'Detalhes do Departamento',
            departamento,
        };
    }

    @Get('edit/:id')
    @Render('departamento/edit')
    async editForm(@Param('id') id: string): Promise<object> {
        const departamento = await this.findDepartamentoOrFail(id);

        return {
            titulo: 'Editar Departamento',
            departamento,
        };
    }

    @Post('edit/:id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateDepartamentoDto,
        @Res() res,
    ) {
        const numericId = this.parseId(id);
        await this.departamentoService.update(numericId, dto);
        return res.redirect('/departamento');
    }

    @Post('delete/:id')
    async delete(@Param('id') id: string, @Res() res) {
        const numericId = this.parseId(id);
        await this.departamentoService.remove(numericId);
        return res.redirect('/departamento');
    }

    private async findDepartamentoOrFail(id: string) {
        const numericId = this.parseId(id);
        const departamento = await this.departamentoService.findOne(numericId);

        if (!departamento) {
            throw new BadRequestException('Departamento nao encontrado');
        }

        return departamento;
    }

    private parseId(id: string): number {
        const numericId = Number(id);

        if (isNaN(numericId)) {
            throw new BadRequestException('ID invalido');
        }

        return numericId;
    }
}
