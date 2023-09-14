import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Igrac } from '../../models/igrac';

const selectIgraciFeature = createFeatureSelector<Igrac[]>('igraci');
export const selectSviIgraci = createSelector(selectIgraciFeature, (p) => p);
