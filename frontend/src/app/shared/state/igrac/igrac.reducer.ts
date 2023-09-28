import { createReducer, on } from '@ngrx/store';
import { initialStateIgrac } from './igrac.state';
import * as IgracActions from './igrac.actions';

export const igracReducer = createReducer(
  initialStateIgrac,
  on(IgracActions.vratiSveIgrace, (state) => {
    return state;
  }),
  on(IgracActions.postaviPrijavljenogIgraca, (state, { prijavljeniIgrac }) => ({
    ...state,
    prijavljeniIgrac,
  }))
);
// export const igracReducerBaza = createReducer(
//   initialStateIgrac,
//   on(IgracActions.vratiSveIgracSuccess, (state, { igraci }) => ({
//     ...state,
//     igraci,
//   })),
//   on(IgracActions.postaviPrijavljenogIgraca, (state, { prijavljeniIgrac }) => ({
//     ...state,
//     prijavljeniIgrac,
//   }))
// );
