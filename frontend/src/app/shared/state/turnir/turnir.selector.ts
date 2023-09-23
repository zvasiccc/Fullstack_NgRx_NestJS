// turnir.selectors.ts
import {
  MemoizedSelector,
  State,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { TurnirState } from './turnir.state';
import { AppState } from '../app.state';
import { Turnir } from '../../models/turnir';

export const selectTurniri = (state: AppState) => state.turnirState;

const selectTurniriFeature = createFeatureSelector<Turnir[]>('turniri');
const selectPrijavljeniTurniriFeature =
  createFeatureSelector<Turnir[]>('prijavljeniTurniri');
//export const selectSviTurniri = createSelector(selectTurniriFeature, (p) => p);
// export const selectSviTurniri = createSelector(
//   selectTurniriFeature,
//   (turniri) => {
//     console.log('svi turniri' + turniri);
//     return turniri;
//   }
// );
// export const selectSviTurniri = createSelector(
//   selectTurniriFeature,
//   (turniri: Turnir[]) => turniri
// );
export const selectTurnirById = createSelector(
  selectTurniri,
  (state: TurnirState, props: { id: number }) =>
    state.turniri.find((turnir) => turnir.id === props.id)
);

// export const selectPrijavljeniIgraciZaTurnir = (turnirId: number) =>
//   createSelector(selectTurniriFeature, (turniri: any) => {
//     const turnir = (turniri.turniri as Turnir[]).find((t) => t.id === turnirId);
//     return turnir ? turnir.prijavljeniIgraci : [];
//   });
export const selectPrijavljeniIgraciZaTurnir = (turnirId: number) =>
  createSelector(selectTurniriFeature, (turniri: Turnir[]) => {
    console.log(turniri); // Ispisuje niz turnira
    if (turniri) {
      const turnir = turniri.find((t) => t.id === turnirId) as Turnir;
      if (turnir) {
        return turnir.prijavljeniIgraci; // Vraća prijavljene igrače za odabrani turnir
      } else {
        return [];
      }
    } else {
      return [];
    }
  });

export const selectPrijavljeniTurniri = createSelector(
  selectPrijavljeniTurniriFeature,
  (prijavljeniTurniri) => prijavljeniTurniri
);
