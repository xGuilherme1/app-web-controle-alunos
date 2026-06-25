import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { AlunoEvento } from '../aluno-evento/aluno-evento.entity';

@Entity('evento')
export class Evento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_eve!: number;

  @Column({ type: 'varchar', length: 150 })
  titulo_eve!: string;

  @Column({ name: 'data_eve', type: 'date' })
  data_eve!: Date;

  @Column({ type: 'varchar', length: 150 })
  local_eve!: string;

  @OneToMany(() => AlunoEvento, (ae) => ae.evento)
  aluno!: AlunoEvento[];  
}
