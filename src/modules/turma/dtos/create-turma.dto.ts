import { Type } from 'class-transformer';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateTurmaDto {
  @IsString()
  @Length(1, 150)
  nome_tur!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  ano_tur!: number;
}
