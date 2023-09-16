import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Turnir } from '../../models/turnir';

const selectPrijavaFeature = (state: AppState) => state.prijavaState;

const selectTurnirUPrijaviFeature =
  createFeatureSelector<Turnir>('turnirUPrijavi');

export const selectTurnirUPrijavi = createSelector(
  selectTurnirUPrijaviFeature,
  (turnir) => turnir
);
