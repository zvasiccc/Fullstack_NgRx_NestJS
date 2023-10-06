// turnir.state.ts
import { Turnir } from '../../models/turnir';

export interface TurnirState {
  turniri: Turnir[];
  selektovaniTurnir: Turnir | null;
}

export const initialStateTurnir: TurnirState = {
  turniri: [
    {
      id: 1,
      naziv: 'opa',
      datumOdrzavanja: '1.1.2002.',
      mestoOdrzavanja: 'pirot',
      maxBrojTimova: 50,
      trenutniBrojTimova: 10,
      nagrada: 500,
      prijavljeniIgraci: [],
    },
  ],
  selektovaniTurnir: null,
};
