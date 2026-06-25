import { IsString, Length } from 'class-validator';

export class CreateDepartamentoDto {
  @IsString()
  @Length(1, 100)
  nome_dep!: string;
}
