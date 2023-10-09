import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { Role } from 'src/roles/role.enum';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IgracEntity {
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
  @Column()
  vodjaTima: boolean;
  roles: Role;
  @ManyToMany(() => PrijavaEntity, (prijava) => prijava.igraci)
  prijave: PrijavaEntity[];
}
