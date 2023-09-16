import { Igrac } from '../../models/igrac';
import { Turnir } from '../../models/turnir';

export interface PrijavaState {
  turnir: Turnir;
  igraciUTimu: Igrac[];
}
export const initialStatePrijava: PrijavaState = {
  turnir: {
    id: 1,
    naziv: 'turnir iz initial',
    datumOdrzavanja: '3.3.2012.',
    mestoOdrzavanja: 'mzgos',
    maxBrojUcesnika: 4,
    prijavljeniIgraci: [],
  },
  igraciUTimu: [],
};
