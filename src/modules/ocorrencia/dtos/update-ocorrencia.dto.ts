import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateOcorrenciaDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  tipo_oco?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  descricao_oco?: string;

  @IsOptional()
  @IsDateString()
  data_oco?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  aluno?: number;
}
