import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Organizator } from '../../models/organizator';
import { Igrac } from '../../models/igrac';

const selectPrijavljeniKorisnikFeature = createFeatureSelector<
  Organizator | Igrac | undefined
>('prijavljeniKorisnik');
export const selectPrijavljeniKorisnik = createSelector(
  selectPrijavljeniKorisnikFeature,
  (state) => state
);
