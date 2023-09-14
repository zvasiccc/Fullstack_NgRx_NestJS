import { Igrac } from './igrac';

export class Turnir {
  id: number;
  naziv: string;
  datumOdrzavanja: string;
  brojUcesnika: number;
  prijavljeniIgraci: Igrac[] = [];

  constructor(id: number, naziv: string, datum: string, brojUcesnika: number) {
    this.id = id;
    this.naziv = naziv;
    this.datumOdrzavanja = datum;
    this.brojUcesnika = brojUcesnika;
  }
}
