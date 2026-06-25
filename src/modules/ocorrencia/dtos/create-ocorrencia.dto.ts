import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsString, Length } from 'class-validator';

export class CreateOcorrenciaDto {
  @IsString()
  @Length(1, 100)
  tipo_oco!: string;

  @IsString()
  @Length(1, 500)
  descricao_oco!: string;

  @IsDateString()
  data_oco!: string;

  @Type(() => Number)
  @IsInt()
  aluno!: number;
}
