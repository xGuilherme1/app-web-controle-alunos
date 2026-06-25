import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDisciplinaDto {
  @IsOptional()
  @IsString()
  @Length(1, 150)
  nome_dis?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  professor?: number;
}
