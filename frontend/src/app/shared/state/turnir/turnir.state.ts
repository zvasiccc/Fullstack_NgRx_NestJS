import { Turnir } from '../../models/turnir';

export interface TurnirState {
  turniri: Turnir[];
}
export const initialStateTurnir: TurnirState = {
  turniri: [
    // {
    //   id: 1,
    //   naziv: 'turnir1',
    //   datumOdrzavanja: '3.3.2023.',
    //   mestoOdrzavanja: 'Pirot',
    //   maxBrojUcesnika: 30,
    //   prijavljeniIgraci: [
    //     {
    //       id: 1,
    //       korisnickoIme: 'somi123',
    //       ime: 'Milos',
    //       prezime: 'Jankovic',
    //       vodjaTima: false,
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   naziv: 'turnir2',
    //   datumOdrzavanja: '8.3.2023.',
    //   mestoOdrzavanja: 'Berilovac',
    //   maxBrojUcesnika: 55,
    //   prijavljeniIgraci: [
    //     {
    //       id: 2,
    //       korisnickoIme: 'dzontranjeze',
    //       ime: 'Dzontra',
    //       prezime: 'Dzontric',
    //       vodjaTima: true,
    //     },
    //   ],
    // },
  ],
};
