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
  ],
};
