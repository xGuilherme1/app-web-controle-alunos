import { Module } from '@nestjs/common';
import { DepartamentoController } from './departamento.controller';
import { DepartamentoService } from './departamento.service';

@Module({
  imports: [],
  controllers: [DepartamentoController],
  providers: [DepartamentoService],
  exports: []
})
export class DepartamentoModule {}
