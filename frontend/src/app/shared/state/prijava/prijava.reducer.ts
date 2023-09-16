import { createReducer, on } from '@ngrx/store';
import { initialStatePrijava } from './prijava.state';
import * as PrijavaActions from './prijava.actions';
export const prijavaReducer = createReducer(
  initialStatePrijava,
  on(PrijavaActions.prijaviSeNaTurnir, (state, { turnir }) => {
    return { ...state, turnir }; //vraca novo stanje sa novim turnirom
  })
);
