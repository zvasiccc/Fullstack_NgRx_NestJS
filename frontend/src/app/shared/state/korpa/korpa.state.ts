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
      brojUcesnika: 30,
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
