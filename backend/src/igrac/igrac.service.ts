import { Injectable } from '@nestjs/common';
import { IgracEntity } from './igrac.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IgracService {
  constructor(
    @InjectRepository(IgracEntity)
    private igracRepository: Repository<IgracEntity>,
  ) {}

  async vratiSveIgrace() {
    return await this.igracRepository.find();
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
  vratiIgracePoKorisnickomImenu(korisnickoIme: string) {
    console.log(korisnickoIme);
    return [
      {
        id: 1,
        korisnickoIme: 'milos123',
        ime: 'Milos',
        prezime: 'Djordjevic',
        vodjaTima: true,
      },
    ];
  }

  async dodajIgraca(igrac: any) {
    const p = this.igracRepository.create();
    p.korisnickoIme = igrac.korisnickoIme;
    p.ime = igrac.ime;
    p.prezime = igrac.prezime;
    p.vodjaTima = igrac.vodjaTima;
    return await this.igracRepository.save(p);
  }
}
