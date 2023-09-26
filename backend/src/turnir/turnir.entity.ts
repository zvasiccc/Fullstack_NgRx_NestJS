import { IgracEntity } from 'src/igrac/igrac.entity';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
  @Column()
  nagrada: number;
  @OneToMany(() => PrijavaEntity, (prijava) => prijava.turnir)
  prijave: PrijavaEntity[];
}
