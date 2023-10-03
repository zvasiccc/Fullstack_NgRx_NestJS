// import { createReducer, on } from '@ngrx/store';
// import { initialStateIgrac } from './igrac.state';
// import * as IgracActions from './igrac.actions';

// export const igracReducer = createReducer(
//   initialStateIgrac,
//   on(IgracActions.vratiSveIgrace, (state) => {
//     return state;
//   })

//! samo na gore treba
// on(IgracActions.postaviPrijavljenogIgraca, (state, { prijavljeniIgrac }) => ({
//   ...state,
//   prijavljeniIgrac,
// })),
// on(IgracActions.odjaviPrijavljenogIgraca, (state) => ({
//   ...state,
//   prijavljeniIgrac: null,
// }))
//);
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
