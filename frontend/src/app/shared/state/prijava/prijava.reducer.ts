import { createReducer, on } from '@ngrx/store';
import { initialStatePrijava } from './prijava.state';
import * as PrijavaActions from './prijava.actions';
export const prijavaReducer = createReducer(
  initialStatePrijava,
  on(PrijavaActions.prijaviSeNaTurnir, (state, { turnir }) => {
    return { ...state, turnir }; //vraca novo stanje sa novim turnirom
  }),
  on(PrijavaActions.dodajIgracaUTim, (state, { igrac }) => {
    const noviIgraciUTimu = [...state.igraciUTimu, igrac];
    return { ...state, igraciUTimu: noviIgraciUTimu };
  }),
  on(PrijavaActions.dodajPreferenceUPrijavu, (state, { preference }) => ({
    ...state,
    preference: { ...preference },
  }))
);
