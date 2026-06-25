import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Aluno } from "../aluno/aluno.entity";

@Entity('ocorrencia')
export class Ocorrencia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_oco!: number;

  @Column({ type: 'varchar', length: 100 })
  tipo_oco!: string;

  @Column({ type: 'varchar', length: 500 })
  descricao_oco!: string;

  @Column({ name: 'data_oco', type: 'date' })
  data_oco!: Date;

  @ManyToOne(() => Aluno)
    @JoinColumn({ 
        name: 'id_aluno_fk'
    })
    aluno!: Aluno;
}
