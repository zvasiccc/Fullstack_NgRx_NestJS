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
  //!vise igraca cine jednu prijavu tj jedan tim
  //igraci: IgracEntity[];
  //turnir: TurnirEntity; sad oce, do cascade je znaci bilo, a sto bas ovde cascade
  // TI Hoces da kad sacuvavas prijavu sacuvas i novi igraciti?
  //mislim da je bolje da se samo povezu vec postojeci igraci s novu priajvu
  // Moze i teka, al onda dju moras ih pretrazujes, tad ce raboti sig
  //kao sto ovamo turnirr prettazujem
  @ManyToMany(() => IgracEntity, (igrac) => igrac, {
    cascade: true,
  })
  @JoinTable()
  igraci: IgracEntity[];

  // Veza sa turnirom
  @ManyToOne(() => TurnirEntity, (turnir) => turnir.prijave)
  turnir: TurnirEntity;
}
