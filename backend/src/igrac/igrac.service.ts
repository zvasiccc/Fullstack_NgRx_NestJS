import { Injectable } from '@nestjs/common';

@Injectable()
export class IgracService {
  vratiSveIgrace() {
    return [
      {
        id: 1,
        ime: 'Milos',
        prezime: 'Djordjevic',
        vodjaTima: true,
      },
      {
        id: 2,
        ime: 'Dimitrije',
        prezime: 'Zivkovic',
        vodjaTima: false,
      },
      {
        id: 3,
        ime: 'Petar',
        prezime: 'Mancic',
        vodjaTima: false,
      },
    ];
  }
}
