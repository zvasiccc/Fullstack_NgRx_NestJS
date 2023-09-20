import { Injectable } from '@nestjs/common';
import { IgracEntity } from './igrac.entity';

@Injectable()
export class IgracService {
  vratiSveIgrace() {
    return [
      {
        id: 1,
        korisnickoIme: 'milos123',
        ime: 'Milos',
        prezime: 'Djordjevic',
        vodjaTima: true,
      },
      {
        id: 2,
        korisnickoIme: 'baneroti',
        ime: 'Dimitrije',
        prezime: 'Zivkovic',
        vodjaTima: false,
      },
      {
        id: 3,
        korisnickoIme: 'ludjakat',
        ime: 'Petar',
        prezime: 'Mancic',
        vodjaTima: false,
      },
    ];
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
}
