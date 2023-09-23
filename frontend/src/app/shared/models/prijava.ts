import { Igrac } from './igrac'; // Pretpostavljam da već postoji interfejs ili model za Igrac
import { Turnir } from './turnir'; // Pretpostavljam da već postoji interfejs ili model za Turnir

export interface Prijava {
  nazivTima: string;
  potrebanBrojSlusalica: number;
  potrebanBrojRacunara: number;
  potrebanBrojTastatura: number;
  potrebanBrojMiseva: number;
  igraci: Igrac[]; //
  turnir: Turnir | null; //
}
