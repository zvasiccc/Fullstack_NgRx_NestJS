import { createReducer, on } from '@ngrx/store';
import { initialStatePrijava } from './prijava.state';
import * as PrijavaActions from './prijava.actions';
export const prijavaReducer = createReducer(
  initialStatePrijava,
  on(PrijavaActions.prijaviSeNaTurnir, (state, { turnir }) => {
    return { ...state, turnir }; //vraca novo stanje sa novim turnirom
  }),
  on(PrijavaActions.dodajIgracaUTim, (state, { igrac }) => {
    if (
      state.igraciUTimu.some((postojeciIgrac) => postojeciIgrac.id === igrac.id)
    ) {
      return state;
    }
    const noviIgraciUTimu = [...state.igraciUTimu, igrac];
    return { ...state, igraciUTimu: noviIgraciUTimu };
  }),
  on(PrijavaActions.izbaciIgracaIzTima, (state, { igrac }) => {
    const noviIgraciUTimu = state.igraciUTimu.filter((i) => i !== igrac);
    return { ...state, igraciUTimu: noviIgraciUTimu };
  }),
  on(PrijavaActions.dodajPreferenceUPrijavu, (state, { preference }) => ({
    ...state,
    preference: { ...preference },
  })),
  on(PrijavaActions.odjaviSeSaNaloga, (state) => {
    return { ...initialStatePrijava };
  })
);
