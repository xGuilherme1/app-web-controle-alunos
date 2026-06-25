import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Curso } from "../curso/curso.entity";
import { Turma } from "../turma/turma.entity";
import { Endereco } from "../endereco/endereco.entity";
import { AlunoDisciplina } from '../aluno-disciplina/aluno-disciplina.entity';
import { AlunoEvento } from '../aluno-evento/aluno-evento.entity';

@Entity('aluno')
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_alu!: number;

  @Column({ type: 'varchar', length: 150 })
  nome_alu!: string;

  @Column({ name: 'data_nascimento_alu', type: 'date' })
  data_nascimento_alu!: Date;

  @ManyToOne(() => Curso)
    @JoinColumn({ 
        name: 'id_curso_fk'
    })
    curso!: Curso;

    @ManyToOne(() => Turma)
    @JoinColumn({ 
        name: 'id_turma_fk'
    })
    turma!: Turma;

    @ManyToOne(() => Endereco)
    @JoinColumn({ 
        name: 'id_endereco_fk'
    })
    endereco!: Endereco;

    @OneToMany(() => AlunoDisciplina, (ad) => ad.aluno)
    disciplina!: AlunoDisciplina[];

    @OneToMany(() => AlunoEvento, (ae) => ae.aluno)
    evento!: AlunoEvento[];
}
