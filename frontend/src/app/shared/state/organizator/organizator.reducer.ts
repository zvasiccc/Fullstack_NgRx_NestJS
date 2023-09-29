import { createReducer, on } from '@ngrx/store';
import { initialStateOrganizator } from './organizator.state';
import * as OrganizatorActions from './organizator.actions';
export const organizatorReducer = createReducer(
  initialStateOrganizator,
  on(
    OrganizatorActions.postaviPrijavljenogOrganizatora,
    (state, { prijavljeniOrganizator }) => ({
      ...state,
      prijavljeniOrganizator,
    })
  )
);
