import { createAction, props } from '@ngrx/store';
import { Organizator } from '../../models/organizator';

export const postaviPrijavljenogOrganizatora = createAction(
  '[Organizator] postavi prijavljenog organizatora',
  props<{ prijavljeniOrganizator: Organizator }>()
);
export const odjaviPrijavljenogOrganizatora = createAction(
  '[Organizator] odjavi prijavljenog organizatora'
);
