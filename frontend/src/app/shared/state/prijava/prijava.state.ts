import { Igrac } from '../../models/igrac';
import { Turnir } from '../../models/turnir';

export interface PrijavaState {
  turnir: Turnir;
  igraciUTimu: Igrac[];
  potrebanBrojSlusalica: number;
  potrebanBrojRacunara: number;
  potrebanBrojTastatura: number;
  potrebanBrojMiseva: number;
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
  potrebanBrojSlusalica: 0,
  potrebanBrojRacunara: 0,
  potrebanBrojTastatura: 0,
  potrebanBrojMiseva: 0,
};
