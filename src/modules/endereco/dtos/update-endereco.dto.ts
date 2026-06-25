import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateEnderecoDto {
  @IsOptional()
  @IsString()
  @Length(1, 150)
  logradouro_end?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  numero_end?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  cidade_end?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  estado_end?: string;
}
