import { createReducer, on } from '@ngrx/store';
import { initialStateKorpa } from './korpa.state';
import * as KorpaActions from './korpa.actions';
export const korpaReducer = createReducer(
  initialStateKorpa,
  on(KorpaActions.dodajTurnirUKorpu, (state, { turnir }) => {
    return {
      ...state,
      turniri: [...state.turniri, turnir],
    };
  }),
  on(KorpaActions.ukloniTurnirIzKorpe, (state, { turnirId }) => {
    return {
      ...state,
      turniri: state.turniri.filter((turnir) => turnir.id !== turnirId),
    };
  }),
  on(KorpaActions.sviTurniriUKorpi, (state) => {
    return state;
  })
);
