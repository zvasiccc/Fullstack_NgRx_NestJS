import { Prijava } from './prijava';
import { Turnir } from './turnir';

export interface Igrac {
  id: number;
  korisnickoIme: string;
  ime: string;
  prezime: string;
  vodjaTima: boolean;
}
