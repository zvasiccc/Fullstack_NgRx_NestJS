// // turnir.selectors.ts
// import {
//   MemoizedSelector,
//   State,
//   createFeatureSelector,
//   createSelector,
// } from '@ngrx/store';
// import { TurnirState } from './turnir.state';
// import { AppState } from '../app.state';
// import { Turnir } from '../../models/turnir';

// export const selectTurniri = (state: AppState) => state.turnirState;

// const selectTurniriFeature = createFeatureSelector<Turnir[]>('turniri');
// const selectPrijavljeniTurniriFeature =
//   createFeatureSelector<Turnir[]>('prijavljeniTurniri');

// export const selectPrijavljeniIgraciZaTurnir = (turnirId: number) =>
//   createSelector(selectTurniriFeature, (turniri: Turnir[]) => {
//     console.log(turniri); // Ispisuje niz turnira
//     if (turniri) {
//       const turnir = turniri.find((t) => t.id === turnirId) as Turnir;
//       if (turnir) {
//         return turnir.prijavljeniIgraci; // Vraća prijavljene igrače za odabrani turnir
//       } else {
//         return [];
//       }
//     } else {
//       return [];
//     }
//   });

// export const selectPrijavljeniTurniri = createSelector(
//   selectPrijavljeniTurniriFeature,
//   (prijavljeniTurniri) => prijavljeniTurniri
// );
