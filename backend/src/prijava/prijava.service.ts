import { Injectable } from '@nestjs/common';

@Injectable()
export class PrijavaService {
  vratiPrijavuPoId(id: number) {
    return [
      {
        zeljeniSok: 'pepsi',
        zeljenaHrana: 'pljeskavica',
        potrebnaOprema: true,
        igraci: [
          {
            id: 2,
            ime: 'dimitrije',
            prezime: ' zivkovic',
            vodjaTima: false,
          },
          {
            id: 3,
            ime: 'petar',
            prezime: ' mancic',
            vodjaTima: false,
          },
        ],
        turnir: {
          id: 2,
          naziv: ' Turnir 2',
          datumOdrzavanja: '3.3.2023.',
          mestoOdrzavanja: 'Radindol',
          maxBrojUcesnika: 40,
        },
      },
    ];
  }
}
