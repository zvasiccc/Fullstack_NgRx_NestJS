import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IgracState } from './igrac.state';
import { Igrac } from '../../models/igrac';

const selectIgracFeature = createFeatureSelector<IgracState>('igraci');
export const selectSviIgraci = createSelector(
  selectIgracFeature,
  (igraci) =>
    igraci.ids
      .map((id) => igraci.entities[id]) //vraca niz a ne dictionary(da smo rekli odmah samo turniri.entities)
      // .filter((turnir) => turnir != null && turnir != undefined) // ovo != znaci da nije null ni undefined a !== bi znacilo da nije null
      // .map((turnir) => <Turnir>turnir)
      .filter((igrac) => igrac !== null && igrac !== undefined) as Igrac[]
);
