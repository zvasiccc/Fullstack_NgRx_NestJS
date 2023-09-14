import { Igrac } from '../../models/igrac';

export interface IgracState {
  igraci: Igrac[];
}
export const initialStateIgrac: IgracState = {
  igraci: [
    {
      id: 1,
      ime: 'Milos',
      prezime: 'Jankovic',
      rejting: 1200,
    },
    {
      id: 2,
      ime: 'Dzontra',
      prezime: 'Dzontric',
      rejting: 1200,
    },
  ],
};
