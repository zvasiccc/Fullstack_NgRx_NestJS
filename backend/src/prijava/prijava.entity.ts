import { IgracEntity } from 'src/igrac/igrac.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PrijavaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nazivTima: string;
  @Column()
  potrebanBrojSlusalica: number;
  @Column()
  potrebanBrojRacunara: number;
  @Column()
  potrebanBrojTastatura: number;
  @Column()
  potrebanBrojMiseva: number;

  @ManyToMany(() => IgracEntity, (igrac) => igrac.prijave, {
    cascade: true,
  })
  @JoinTable()
  igraci: IgracEntity[];

  @ManyToOne(() => TurnirEntity, (turnir) => turnir.prijave)
  turnir: TurnirEntity;
}
