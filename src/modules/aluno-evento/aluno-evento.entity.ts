import { BaseEntity, Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Aluno } from "../aluno/aluno.entity";
import { Evento } from "../evento/evento.entity";

@Entity('alunoEvento')
export class AlunoEvento extends BaseEntity {
  @PrimaryColumn({ name: 'alunoId' })
  alunoId!: number;

  @PrimaryColumn({ name: 'eventoId' })
  eventoId!: number;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: 'alunoId' })
  aluno!: Aluno;

  @ManyToOne(() => Evento)
  @JoinColumn({ name: 'eventoId' })
  evento!: Evento;

  @Column({ type: 'boolean', nullable: true })
  presenca!: boolean;
}