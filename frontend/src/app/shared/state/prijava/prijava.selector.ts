import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Turnir } from '../../models/turnir';
import { Igrac } from '../../models/igrac';
import { PrijavaState } from './prijava.state';

const selectPrijavaFeature = (state: AppState) => state.prijavaState;

const selectTurnirUPrijaviFeature =
  createFeatureSelector<Turnir>('turnirUPrijavi');
const selectIgraciUPrijaviFeature =
  createFeatureSelector<Igrac[]>('igraciUPrijavi');
const selectPotrebanBrojSlusalicaFeature = createFeatureSelector<number>(
  'potrebanBrojSlusalica'
);
export const selectPotrebanBrojSlusalica = createSelector(
  selectPotrebanBrojSlusalicaFeature,
  (p) => p
);
export const selectTurnirUPrijavi = createSelector(
  selectTurnirUPrijaviFeature,
  (turnir) => turnir
);
export const selectIgraciUPrijavi = createSelector(
  selectIgraciUPrijaviFeature,
  (igraciUTimu) => igraciUTimu
);
