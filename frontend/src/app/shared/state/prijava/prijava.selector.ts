import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Turnir } from '../../models/turnir';
import { Igrac } from '../../models/igrac';

const selectPrijavaFeature = (state: AppState) => state.prijavaState;

const selectTurnirUPrijaviFeature =
  createFeatureSelector<Turnir>('turnirUPrijavi');
const selectIgraciUPrijaviFeature =
  createFeatureSelector<Igrac[]>('igraciUPrijavi');

export const selectTurnirUPrijavi = createSelector(
  selectTurnirUPrijaviFeature,
  (turnir) => turnir
);
export const selectIgraciUPrijavi = createSelector(
  selectIgraciUPrijaviFeature,
  (igraciUTimu) => igraciUTimu
);
