import { IgracEntity } from 'src/igrac/igrac.entity';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class TurnirEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  naziv: string;
  @Column()
  datumOdrzavanja: string;
  @Column()
  mestoOdrzavanja: string;
  @Column()
  maxBrojUcesnika: number;
  prijave: PrijavaEntity[];
}
