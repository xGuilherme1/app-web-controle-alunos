import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Departamento } from "../departamento/departamento.entity";

@Entity('curso')
export class Curso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cur!: number;

  @Column({ type: 'varchar', length: 100 })
  nome_cur!: string;

  @Column({ type: 'int' })
  carga_horaria_cur!: number;

  @ManyToOne(() => Departamento, (dep) => dep.id_dep)
  @JoinColumn({ name: 'id_departamento_fk' })
  departamento!: Departamento;
}