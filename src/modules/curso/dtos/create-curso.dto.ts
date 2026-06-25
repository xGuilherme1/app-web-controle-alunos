import { IsInt, IsString, Min, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCursoDto {
  @IsString()
  @Length(1, 100)
  nome_cur!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  carga_horaria_cur!: number;

  @Type(() => Number)
  @IsInt()
  departamento!: number;
}
