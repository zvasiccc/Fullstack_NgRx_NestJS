// turnir.reducer.ts
import { State, createReducer, on } from '@ngrx/store';
import { initialStateTurnir, TurnirState } from './turnir.state';
import * as TurnirActions from './turnir.actions';

// export const turnirReducer = createReducer(
//   initialStateTurnir,
//   on(TurnirActions.kreirajTurnir, (state, { turnir }) => {
//     return {
//       ...state,
//       turniri: [...state.turniri, turnir], //na ostale turnire dodamo i ovaj nas turnir
//     }; //kada se desi akcija dodaj turnir mi uzimamo trenutno stanje i payload koji smo poslali zajdno sa akcijom
//     //i vracamo novo stanje
//   }),

//   on(TurnirActions.urediTurnir, (state, { turnir }) => {
//     const index = state.turniri.findIndex((t) => t.id === turnir.id);
//     if (index === -1) {
//       return state;
//     }
//     const updatedTurniri = [...state.turniri];
//     updatedTurniri[index] = turnir;

//     return {
//       ...state,
//       turniri: updatedTurniri,
//     };
//   }),
//   on(TurnirActions.obrisiTurnir, (state, { turnirId }) => {
//     return {
//       ...state,
//       turniri: state.turniri.filter((turnir) => turnir.id !== turnirId),
//     };
//   }),

//   on(TurnirActions.vratiSveTurnire, (state) => {
//     return state;
//   })
// );
export const turnirReducerBaza = createReducer(
  initialStateTurnir,
  on(TurnirActions.vratiSveTurnireSuccess, (state, { turniri }) => ({
    ...state,
    turniri,
  })),
  on(TurnirActions.prijaviSeNaTurnir, (state, { turnir }) => {
    // Dodajte trenutni turnir u listu prijavljenih turnira
    const prijavljeniTurniri = [...state.prijavljeniTurniri, turnir];
    return {
      ...state,
      prijavljeniTurniri,
    };
  })
);
