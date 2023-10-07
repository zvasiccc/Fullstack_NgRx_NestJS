import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TurnirState } from './turnir.state';
import { AppState } from '../app.state';
import { Turnir } from '../../models/turnir';

const selectTurnirFeature = createFeatureSelector<TurnirState>('turniri');

// export const selectSviTurniri = createSelector(
//   selectTurnirFeature,
//   (state) => state.turniri
// );
export const selectSviTurniri = createSelector(selectTurnirFeature, (turniri) =>
  turniri.ids
    .map((id) => turniri.entities[id]) //vraca niz a ne dictionary(da smo rekli odmah samo turniri.entities)
    .filter((turnir) => turnir != null) // ovo != znaci da nije null ni undefined a !== bi znacilo da nije null
    .map((turnir) => <Turnir>turnir)
);

export const selectIzabraniTurnirId = createSelector(
  selectTurnirFeature,
  (state) => state.izabraniTurnir
);
export const selectIzabraniTurnir = createSelector(
  selectTurnirFeature,
  selectIzabraniTurnirId,
  (turniri, turnirId) => turniri.entities[turnirId]
);
