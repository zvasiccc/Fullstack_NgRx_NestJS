import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Igrac } from '../../models/igrac';

const selectIgraciFeature = createFeatureSelector<Igrac[]>('igraci');
const selectPrijavljeniIgracFeature =
  createFeatureSelector<Igrac>('prijavljeniIgrac');
export const selectSviIgraci = createSelector(
  selectIgraciFeature,
  (igrac) => igrac
);

// export const selectPrijavljeniIgrac = createSelector(
//   selectPrijavljeniIgracFeature,
//   (state) => state
// );
