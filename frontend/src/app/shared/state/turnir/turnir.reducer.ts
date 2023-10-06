// turnir.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TurnirActions from './turnir.actions';
import { initialStateTurnir, TurnirState } from './turnir.state';

export const turnirReducer = createReducer(
  initialStateTurnir,
  on(TurnirActions.fetchTurniriUspesno, (state, { turniri }) => ({
    ...state,
    turniri, // Dodajte dohvaćene turnire u stanje
  }))
  // Dodajte druge slučajeve reducera specifične za turnire ovde...
);
