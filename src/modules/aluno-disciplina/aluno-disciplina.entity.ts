import { BaseEntity, Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Aluno } from "../aluno/aluno.entity";
import { Disciplina } from "../disciplina/disciplina.entity";

@Entity('alunoDisciplina')
export class AlunoDisciplina extends BaseEntity {
  @PrimaryColumn({ name: 'alunoId' })
  alunoId!: number;

  @PrimaryColumn({ name: 'disciplinaId' })
  disciplinaId!: number;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: 'alunoId' })
  aluno!: Aluno;

  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: 'disciplinaId' })
  disciplina!: Disciplina;

  @Column({ type: 'decimal', nullable: true })
  nota!: number;
}