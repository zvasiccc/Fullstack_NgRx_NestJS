import { Role } from 'src/roles/role.enum';
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
  @Column()
  ime: string;
  @Column()
  prezime: string;
  //ima vise turnira
  roles: Role;
  @OneToMany(() => TurnirEntity, (turnir) => turnir.organizator)
  turniri: TurnirEntity[];
}
