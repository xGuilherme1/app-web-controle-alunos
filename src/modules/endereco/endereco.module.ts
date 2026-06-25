import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';

@Module({
  imports: [],
  controllers: [EnderecoController],
  providers: [EnderecoService],
  exports: []
})
export class EnderecoModule {}
