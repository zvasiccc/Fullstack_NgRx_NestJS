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
      vodjaTima: true,
    },
    {
      id: 2,
      ime: 'Dzontra',
      prezime: 'Dzontric',
      vodjaTima: false,
    },
  ],
};
