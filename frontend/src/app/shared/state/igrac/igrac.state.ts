import { Igrac } from '../../models/igrac';

export interface IgracState {
  igraci: Igrac[];
}
export const initialStateIgrac: IgracState = {
  igraci: [
    {
      id: 1,
      korisnickoIme: 'milos123',
      ime: 'Milos',
      prezime: 'Jankovic',
      vodjaTima: true,
    },
    {
      id: 2,
      korisnickoIme: 'dzontravac',
      ime: 'Dzontra',
      prezime: 'Dzontric',
      vodjaTima: false,
    },
  ],
};
