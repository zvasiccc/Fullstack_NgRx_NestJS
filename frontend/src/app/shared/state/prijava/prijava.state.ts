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
    id: 0,
    naziv: '',
    datumOdrzavanja: '',
    mestoOdrzavanja: '',
    maxBrojUcesnika: 0,
    prijavljeniIgraci: [],
  },
  igraciUTimu: [],
  preference: {
    potrebanBrojSlusalica: 0,
    potrebanBrojRacunara: 0,
    potrebanBrojTastatura: 0,
    potrebanBrojMiseva: 0,
  },
};
