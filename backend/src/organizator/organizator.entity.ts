import { TurnirEntity } from 'src/turnir/turnir.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrganizatorEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  korisnickoIme: string;
  @Column()
  lozinka: string;
  //ima vise turnira
  @OneToMany(() => TurnirEntity, (turnir) => turnir.organizator)
  turniri: TurnirEntity[];
}
