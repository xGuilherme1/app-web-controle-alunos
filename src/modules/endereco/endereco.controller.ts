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
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dtos/create-endereco.dto';
import { UpdateEnderecoDto } from './dtos/update-endereco.dto';

@Controller('endereco')
export class EnderecoController {
  constructor(private enderecoService: EnderecoService) {}

  @Get()
  @Render('endereco/index')
  async inicial(): Promise<object> {
    const enderecos = await this.enderecoService.findAll();

    return {
      titulo: 'Consulta de Enderecos',
      enderecos,
    };
  }

  @Get('create')
  @Render('endereco/create')
  createForm(): object {
    return {
      titulo: 'Criar Endereco',
    };
  }

  @Post('create')
  async store(@Body() dto: CreateEnderecoDto, @Res() res) {
    await this.enderecoService.create(dto);
    return res.redirect('/endereco');
  }

  @Get('view/:id')
  @Render('endereco/view')
  async view(@Param('id') id: string): Promise<object> {
    const endereco = await this.findEnderecoOrFail(id);

    return {
      titulo: 'Detalhes do Endereco',
      endereco,
    };
  }

  @Get('edit/:id')
  @Render('endereco/edit')
  async editForm(@Param('id') id: string): Promise<object> {
    const endereco = await this.findEnderecoOrFail(id);

    return {
      titulo: 'Editar Endereco',
      endereco,
    };
  }

  @Post('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEnderecoDto,
    @Res() res,
  ) {
    const numericId = this.parseId(id);
    await this.enderecoService.update(numericId, dto);
    return res.redirect('/endereco');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    const numericId = this.parseId(id);
    await this.enderecoService.remove(numericId);
    return res.redirect('/endereco');
  }

  private async findEnderecoOrFail(id: string) {
    const numericId = this.parseId(id);
    const endereco = await this.enderecoService.findOne(numericId);

    if (!endereco) {
      throw new BadRequestException('Endereco nao encontrado');
    }

    return endereco;
  }

  private parseId(id: string): number {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID invalido');
    }

    return numericId;
  }
}
