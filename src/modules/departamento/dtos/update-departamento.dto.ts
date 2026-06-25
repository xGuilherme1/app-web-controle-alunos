import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateDepartamentoDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nome_dep?: string;
}
