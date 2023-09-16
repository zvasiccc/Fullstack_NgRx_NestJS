import { Turnir } from '../../models/turnir';

export interface TurnirState {
  turniri: Turnir[];
  prijavljeniTurniri: Turnir[];
}
export const initialStateTurnir: TurnirState = {
  turniri: [],
  prijavljeniTurniri: [
    {
      id: 3,
      naziv: ' Turnir inicijalni',
      datumOdrzavanja: '3.3.2023.',
      mestoOdrzavanja: 'Sukovo',
      maxBrojUcesnika: 55,
      prijavljeniIgraci: [],
    },
  ],
};
