import { Igrac } from '../../models/igrac';

export interface IgracState {
  igraci: Igrac[];
}
export const initialStateIgrac: IgracState = {
  igraci: [],
};
