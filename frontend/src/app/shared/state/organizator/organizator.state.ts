import { Organizator } from '../../models/organizator';

export interface OrganizatorState {
  prijavljeniOrganizator: Organizator | null;
}
export const initialStateOrganizator: OrganizatorState = {
  prijavljeniOrganizator: null,
};
