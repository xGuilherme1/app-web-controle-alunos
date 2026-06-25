import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateTurmaDto {
  @IsOptional()
  @IsString()
  @Length(1, 150)
  nome_tur?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  ano_tur?: number;
}
