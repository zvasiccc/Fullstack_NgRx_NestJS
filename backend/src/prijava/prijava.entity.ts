import { IgracEntity } from 'src/igrac/igrac.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class PrijavaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nazivTima: string;
  @Column()
  potrebneSlusalice: boolean; //TODO potreban broj namesti, da neki ponesu neki ne moraju
  @Column()
  potrebniRacunari: boolean;
  @Column()
  potrebneTastature: boolean;
  @Column()
  potrebniMisevi: boolean;
  //!vise igraca cine jednu prijavu tj jedan tim
  igraci: IgracEntity[];
  turnir: TurnirEntity;
}
//TODO u store treba 1turnir, niz igraca i jedna preferenca,(koliko slusalica,racunara...)
//i mozda filteri pretrage koja je unesena na front
