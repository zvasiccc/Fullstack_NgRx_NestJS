import { Turnir } from '../../models/turnir';

export interface TurnirState {
  turniri: Turnir[];
}
export const initialStateTurnir: TurnirState = {
  turniri: [
    {
      id: 1,
      naziv: 'turnir1',
      datumOdrzavanja: '3.3.2023.',
      brojUcesnika: 30,
      minRejting: 800,
      maxRejting: 1400,
      prijavljeniIgraci: [
        {
          id: 1,
          ime: 'Milos',
          prezime: 'Jankovic',
          rejting: 1200,
        },
      ],
    },
    {
      id: 2,
      naziv: 'turnir2',
      datumOdrzavanja: '8.3.2023.',
      brojUcesnika: 55,
      minRejting: 1100,
      maxRejting: 1600,
      prijavljeniIgraci: [
        {
          id: 2,
          ime: 'Dzontra',
          prezime: 'Dzontric',
          rejting: 1200,
        },
      ],
    },
  ],
};
