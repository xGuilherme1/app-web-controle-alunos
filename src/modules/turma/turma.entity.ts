import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('turma')
export class Turma extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_tur!: number;

  @Column({ type: 'varchar', length: 150 })
  nome_tur!: string;

  @Column({ type: 'int' })
  ano_tur!: number;
}