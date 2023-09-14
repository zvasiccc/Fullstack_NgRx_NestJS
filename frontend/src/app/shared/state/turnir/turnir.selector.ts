// turnir.selectors.ts
import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { TurnirState } from './turnir.state';
import { AppState } from '../app.state';
import { Turnir } from '../../models/turnir';

export const selectTurniri = (state: AppState) => state.turnirState;

const selectTurniriFeature = createFeatureSelector<Turnir[]>('turniri');
export const selectSviTurniri = createSelector(selectTurniriFeature, (p) => p);
export const selectTurnirById = createSelector(
  selectTurniri,
  (state: TurnirState, props: { id: number }) =>
    state.turniri.find((turnir) => turnir.id === props.id)
);

export const selectBrojTurnira = createSelector(
  selectSviTurniri,
  (turniri) => turniri.length
);
