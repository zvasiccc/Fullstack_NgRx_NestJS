// turnir.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialStateTurnir, TurnirState } from './turnir.state';
import * as TurnirActions from './turnir.actions';

export const turnirReducer = createReducer(
  initialStateTurnir,
  // Obrada akcije za dodavanje turnira
  on(TurnirActions.kreirajTurnir, (state, { turnir }) => {
    return {
      ...state,
      turniri: [...state.turniri, turnir], //na ostale turnire dodamo i ovaj nas turnir
    }; //kada se desi akcija dodaj turnir mi uzimamo trenutno stanje i payload koji smo poslali zajdno sa akcijom
    //i vracamo novo stanje
  }),

  // Obrada akcije za uređivanje turnira
  on(TurnirActions.urediTurnir, (state, { turnir }) => {
    const index = state.turniri.findIndex((t) => t.id === turnir.id);
    if (index === -1) {
      return state;
    }

    const updatedTurniri = [...state.turniri];
    updatedTurniri[index] = turnir;

    return {
      ...state,
      turniri: updatedTurniri,
    };
  }),

  // Obrada akcije za brisanje turnira
  on(TurnirActions.obrisiTurnir, (state, { turnirId }) => {
    return {
      ...state,
      turniri: state.turniri.filter((turnir) => turnir.id !== turnirId),
    };
  }),

  // Obrada akcije za dohvatanje svih turnira
  on(TurnirActions.vratiSveTurnire, (state) => {
    return state; // U ovom slučaju, nema promene stanja, jer će se dohvat turnira obaviti van reducera
  })
);
