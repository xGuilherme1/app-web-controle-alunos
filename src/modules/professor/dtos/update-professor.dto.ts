import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfessorDto {
  @IsOptional()
  @IsString()
  @Length(1, 150)
  nome_pro?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  titulacao_pro?: string;
}
