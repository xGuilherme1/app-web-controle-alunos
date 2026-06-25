import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAlunoEventoDto {
  @IsOptional()
  @Transform(({ value }) => value === 'on' || value === true)
  @IsBoolean()
  presenca?: boolean;
}
