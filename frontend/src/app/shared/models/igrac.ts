import { Prijava } from './prijava';
import { Turnir } from './turnir';

export interface Igrac {
  id: number;
  korisnickoIme: string;
  ime: string;
  prezime: string;
  vodjaTima: boolean;
  //prijave: Prijava[];
  // constructor(
  //   id: number,
  //   koriscnickoIme: string,
  //   ime: string,
  //   prezime: string,
  //   vodjaTima: boolean
  // ) {
  //   this.id = id;
  //   this.korisnickoIme = koriscnickoIme;
  //   this.ime = ime;
  //   this.prezime = prezime;
  //   this.vodjaTima = vodjaTima;
  // }
}
