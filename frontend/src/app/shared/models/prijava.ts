import { Igrac } from './igrac'; // Pretpostavljam da već postoji interfejs ili model za Igrac
import { Turnir } from './turnir'; // Pretpostavljam da već postoji interfejs ili model za Turnir

export interface Prijava {
  zeljeniSok: string;
  zeljenaHrana: string;
  sopstvenaOprema: boolean;
  igraci: Igrac[]; //
  turnir: Turnir; //
}
