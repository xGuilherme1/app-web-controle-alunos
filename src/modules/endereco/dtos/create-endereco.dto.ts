import { IsString, Length } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @Length(1, 150)
  logradouro_end!: string;

  @IsString()
  @Length(1, 20)
  numero_end!: string;

  @IsString()
  @Length(1, 100)
  cidade_end!: string;

  @IsString()
  @Length(1, 50)
  estado_end!: string;
}
