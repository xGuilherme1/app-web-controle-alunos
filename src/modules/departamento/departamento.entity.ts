import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('departamento')
export class Departamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_dep!: number;

  @Column({ type: 'varchar', length: 100 })
  nome_dep!: string;
}