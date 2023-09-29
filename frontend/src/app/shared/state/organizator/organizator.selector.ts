import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Organizator } from '../../models/organizator';

const selectPrijavljeniOrganizatorFeature = createFeatureSelector<Organizator>(
  'prijavljeniOrganizator'
);
export const selectPrijavljeniOrganizator = createSelector(
  selectPrijavljeniOrganizatorFeature,
  (state) => state
);
