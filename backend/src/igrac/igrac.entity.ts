import { PrijavaEntity } from 'src/prijava/prijava.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Collection,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class IgracEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  korisnickoIme: string;
  @Column()
  ime: string;
  @Column()
  prezime: string;
  @Column()
  vodjaTima: boolean;
  //prijave: PrijavaEntity[];
  @ManyToMany(() => PrijavaEntity, (prijava) => prijava.igraci)
  //@JoinTable()
  prijave: PrijavaEntity[];
}
