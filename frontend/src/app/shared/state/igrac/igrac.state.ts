import { Igrac } from '../../models/igrac';

export interface IgracState {
  igraci: Igrac[];
  prijavljeniIgrac: Igrac | null;
}
export const initialStateIgrac: IgracState = {
  igraci: [
    {
      id: 1,
      ime: 'miske',
      prezime: 'misic',
      korisnickoIme: 'miske',
      lozinka: 'sdf',
      vodjaTima: false,
    },
  ],
  prijavljeniIgrac: {
    id: 1,
    ime: 'miske',
    prezime: 'misic',
    korisnickoIme: 'miske',
    lozinka: 'sdf',
    vodjaTima: false,
  },
};
