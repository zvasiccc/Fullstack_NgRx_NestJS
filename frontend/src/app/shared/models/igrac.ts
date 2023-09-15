import { Turnir } from './turnir';

export class Igrac {
  id: number;
  ime: string;
  prezime: string;
  vodjaTima: boolean;
  //prijave:Prijava[];
  constructor(id: number, ime: string, prezime: string, vodjaTima: boolean) {
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.vodjaTima = vodjaTima;
  }
}
