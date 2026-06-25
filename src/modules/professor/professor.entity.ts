import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('professor')
export class Professor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_pro!: number;

  @Column({ type: 'varchar', length: 150 })
  nome_pro!: string;

  @Column({ type: 'varchar', length: 100 })
  titulacao_pro!: string;
}