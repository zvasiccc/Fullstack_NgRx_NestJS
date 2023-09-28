import { Injectable, NotFoundException } from '@nestjs/common';
import { IgracEntity } from './igrac.entity';
import { In, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';

@Injectable()
export class IgracService {
  constructor(
    @InjectRepository(IgracEntity)
    private igracRepository: Repository<IgracEntity>,
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
  ) {}
  //!
  async vratiSveIgrace() {
    return await this.igracRepository.find();
  }

  async vratiIgracePoKorisnickomImenu(korisnickoIme: string) {
    return await this.igracRepository.find({
      where: {
        korisnickoIme: Like(`%${korisnickoIme}%`),
      },
    });
  }
  //!
  async findOne(username: string): Promise<IgracEntity | undefined> {
    return this.igracRepository.findOne({ where: { korisnickoIme: username } });
  }

  vratiPrijavljenogIgraca() {
    return {
      id: 3,
      korisnickoIme: 'ludjakat',
      ime: 'Petar',
      prezime: 'Mancic',
      vodjaTima: false,
    };
  }
  async registrujIgraca(igrac: IgracEntity) {
    const noviIgrac = this.igracRepository.create();
    noviIgrac.korisnickoIme = igrac.korisnickoIme;
    noviIgrac.lozinka = igrac.lozinka;
    noviIgrac.ime = igrac.ime;
    noviIgrac.prezime = igrac.prezime;
    noviIgrac.vodjaTima = igrac.vodjaTima;
    //noviIgrac.roles = igrac.roles;
    return await this.igracRepository.save(noviIgrac);
  }
  async pronadjiIgraceZaPrijavu(prijavaId: number) {
    const prijava = await this.prijavaRepository.findOne({
      where: { id: prijavaId },
    });

    if (!prijava) {
      console.log('ne opstoji prijava sa tim id');
      return [];
    }
    const igraci = await this.igracRepository.find({
      where: {
        id: In([...prijava.igraci]),
      },
    });
    return igraci;
  }
}
