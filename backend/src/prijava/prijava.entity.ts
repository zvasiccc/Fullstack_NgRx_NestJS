import { IgracEntity } from 'src/igrac/igrac.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class PrijavaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  zeljeniSok: string;
  @Column()
  zeljenaHrana: string;
  @Column()
  potrebnaOprema: boolean;
  //!vise igraca cine jednu prijavu tj jedan tim
  igraci: IgracEntity[];
  turnir: TurnirEntity;
}
