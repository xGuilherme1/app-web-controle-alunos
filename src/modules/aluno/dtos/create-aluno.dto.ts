import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsString, Length } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @Length(1, 150)
  nome_alu!: string;

  @IsDateString()
  data_nascimento_alu!: string;

  @Type(() => Number)
  @IsInt()
  curso!: number;

  @Type(() => Number)
  @IsInt()
  turma!: number;

  @Type(() => Number)
  @IsInt()
  endereco!: number;
}
