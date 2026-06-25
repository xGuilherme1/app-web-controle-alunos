import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @Length(1, 150)
  titulo_eve!: string;

  @IsDateString()
  data_eve!: string;

  @IsString()
  @Length(1, 150)
  local_eve!: string;
}
