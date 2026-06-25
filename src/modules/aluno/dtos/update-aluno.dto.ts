import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateAlunoDto {
  @IsOptional()
  @IsString()
  @Length(1, 150)
  nome_alu?: string;

  @IsOptional()
  @IsDateString()
  data_nascimento_alu?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  curso?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  turma?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  endereco?: number;
}
