import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TurnirState } from './turnir.state';

const selectTurnirFeature = createFeatureSelector<TurnirState>('turniri');

export const selectSviTurniri = createSelector(
  selectTurnirFeature,
  (state) => state.turniri
);
