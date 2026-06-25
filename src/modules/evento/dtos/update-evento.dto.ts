import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class UpdateEventoDto {
  @IsOptional()
  @IsString()
  @Length(1, 150)
  titulo_eve?: string;

  @IsOptional()
  @IsDateString()
  data_eve?: string;

  @IsOptional()
  @IsString()
  @Length(1, 150)
  local_eve?: string;
}
