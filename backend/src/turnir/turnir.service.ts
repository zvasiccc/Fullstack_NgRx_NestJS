import { Injectable } from '@nestjs/common';

@Injectable()
export class TurnirService {
  vratiSveTurnire() {
    return [
      {
        id: 1,
        naziv: ' Turnir back 1',
        datumOdrzavanja: '3.3.2023.',
        mestoOdrzavanja: 'Prcevac',
        maxBrojUcesnika: 30,
      },
      {
        id: 2,
        naziv: ' Turnir back 2',
        datumOdrzavanja: '3.3.2023.',
        mestoOdrzavanja: 'Radindol',
        maxBrojUcesnika: 40,
      },
      {
        id: 3,
        naziv: ' Turnir back 3',
        datumOdrzavanja: '3.3.2023.',
        mestoOdrzavanja: 'Sukovo',
        maxBrojUcesnika: 55,
      },
    ];
  }
  odgovarajuciTurniri(naziv: string, mesto: string, datum: string) {
    return {
      id: 3,
      naziv: `pronadjen +${naziv}`,
      datumOdrzavanja: `pronadjen +${mesto}`,
      mestoOdrzavanja: `pronadjen+ ${datum}`,
      maxBrojUcesnika: 55,
    };
  }
}
