import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateAlunoDisciplinaDto {
  @Type(() => Number)
  @IsInt()
  aluno!: number;

  @Type(() => Number)
  @IsInt()
  disciplina!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  nota?: number;
}
