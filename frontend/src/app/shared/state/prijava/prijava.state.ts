import { Igrac } from '../../models/igrac';
import { Preference } from '../../models/preference';
import { Turnir } from '../../models/turnir';

export interface PrijavaState {
  turnir: Turnir;
  igraciUTimu: Igrac[];
  preference: Preference;
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
  preference: {
    potrebanBrojSlusalica: 1,
    potrebanBrojRacunara: 1,
    potrebanBrojTastatura: 1,
    potrebanBrojMiseva: 1,
  },
};
