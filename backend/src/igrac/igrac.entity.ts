import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { Entity, Column, PrimaryGeneratedColumn, Collection } from 'typeorm';

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
  prijave: PrijavaEntity[]; //jer prijava sadrzi vise turnira
}
