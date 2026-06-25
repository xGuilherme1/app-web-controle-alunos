import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateAlunoEventoDto {
  @Type(() => Number)
  @IsInt()
  aluno!: number;

  @Type(() => Number)
  @IsInt()
  evento!: number;

  @IsOptional()
  @Transform(({ value }) => value === 'on' || value === true)
  @IsBoolean()
  presenca?: boolean;
}
