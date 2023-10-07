// turnir.state.ts
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Turnir } from '../../models/turnir';

// export interface TurnirState {
//   turniri: Turnir[];
//   izabraniTurnir: Turnir | null;
// }

// export const initialStateTurnir: TurnirState = {
//   turniri: [
//     {
//       id: 1,
//       naziv: 'opa',
//       datumOdrzavanja: '1.1.2002.',
//       mestoOdrzavanja: 'pirot',
//       maxBrojTimova: 50,
//       trenutniBrojTimova: 10,
//       nagrada: 500,
//       prijavljeniIgraci: [],
//     },
//   ],
//   izabraniTurnir: null,
// };

export interface TurnirState extends EntityState<Turnir> {
  izabraniTurnir: number;
}
export const adapter = createEntityAdapter<Turnir>();
export const initialStateTurnir: TurnirState = adapter.getInitialState({
  izabraniTurnir: 0,
});
