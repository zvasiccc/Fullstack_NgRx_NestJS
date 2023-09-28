import { IgracEntity } from 'src/igrac/igrac.entity';
import { OrganizatorEntity } from 'src/organizator/organizator.entity';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  maxBrojTimova: number;
  @Column()
  trenutniBrojTimova: number;
  @Column()
  nagrada: number;
  @OneToMany(() => PrijavaEntity, (prijava) => prijava.turnir)
  prijave: PrijavaEntity[];
  @ManyToOne(() => OrganizatorEntity, (organizator) => organizator.turniri)
  organizator: OrganizatorEntity;
}
