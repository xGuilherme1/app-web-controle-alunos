import { Injectable } from '@nestjs/common';
import { Departamento } from './departamento.entity';
import { CreateDepartamentoDto } from './dtos/create-departamento.dto';
import { UpdateDepartamentoDto } from './dtos/update-departamento.dto';

@Injectable()
export class DepartamentoService {
    async findAll(): Promise<Departamento[]> {
        return await Departamento.find();
    }

    async findOne(id: number): Promise<Departamento | null> {
        return Departamento.findOne({
            where: { id_dep: id },
        });
    }

    async create(dados: CreateDepartamentoDto): Promise<Departamento> {
        const departamento = new Departamento();

        Object.assign(departamento, {
            nome_dep: dados.nome_dep,
        });

        return departamento.save();
    }

    async update(
        id: number,
        dados: UpdateDepartamentoDto,
    ): Promise<Departamento | null> {
        const departamento = await this.findOne(id);

        if (!departamento) return null;

        Object.assign(departamento, dados);

        return departamento.save();
    }

    async remove(id: number): Promise<Departamento | null> {
        const departamento = await this.findOne(id);

        if (!departamento) return null;

        return departamento.remove();
    }
}
