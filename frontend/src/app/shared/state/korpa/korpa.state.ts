import { Turnir } from '../../models/turnir';

export interface KorpaState {
  turniri: Turnir[];
}
export const initialStateKorpa: KorpaState = {
  turniri: [
    {
      id: 3,
      naziv: 'turnir3',
      datumOdrzavanja: '3.3.2023.',
      maxBrojUcesnika: 30,
      minRejting: 800,
      maxRejting: 1400,
      prijavljeniIgraci: [
        {
          id: 3,
          ime: 'Veljko',
          prezime: 'Antic',
          rejting: 1350,
        },
      ],
    },
  ],
};
