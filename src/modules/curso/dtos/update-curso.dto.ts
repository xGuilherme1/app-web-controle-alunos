import { IsInt, IsString, Min, Length, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCursoDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nome_cur?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  carga_horaria_cur?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  departamento?: number;
}
