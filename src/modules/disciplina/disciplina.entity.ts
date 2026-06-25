import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Professor } from "../professor/professor.entity";
import { AlunoDisciplina } from '../aluno-disciplina/aluno-disciplina.entity';

@Entity('disciplina')
export class Disciplina extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_dis!: number;

  @Column({ type: 'varchar', length: 150 })
  nome_dis!: string;

  @ManyToOne(() => Professor)
    @JoinColumn({ 
        name: 'id_professor_fk'
    })
    professor!: Professor;

  @OneToMany(() => AlunoDisciplina, (ad) => ad.disciplina)
  aluno!: AlunoDisciplina[];
}