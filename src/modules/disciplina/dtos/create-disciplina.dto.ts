import { Type } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateDisciplinaDto {
  @IsString()
  @Length(1, 150)
  nome_dis!: string;

  @Type(() => Number)
  @IsInt()
  professor!: number;
}
