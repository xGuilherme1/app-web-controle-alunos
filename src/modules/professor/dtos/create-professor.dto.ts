import { IsString, Length } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @Length(1, 150)
  nome_pro!: string;

  @IsString()
  @Length(1, 100)
  titulacao_pro!: string;
}
