import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('endereco')
export class Endereco extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_end!: number;

  @Column({ type: 'varchar', length: 150 })
  logradouro_end!: string;

  @Column({ type: 'varchar', length: 20 })
  numero_end!: string;

  @Column({ type: 'varchar', length: 100 })
  cidade_end!: string;
  
  @Column({ type: 'varchar', length: 50 })
  estado_end!: string;
}