import { Igrac } from './igrac';

export class Turnir {
  id: number;
  naziv: string;
  datumOdrzavanja: string;
  brojUcesnika: number;
  minRejting: number;
  maxRejting: number;
  prijavljeniIgraci: Igrac[] = [];

  constructor(
    id: number,
    naziv: string,
    datum: string,
    brojUcesnika: number,
    minRejting: number,
    maxRejting: number
  ) {
    this.id = id;
    this.naziv = naziv;
    this.datumOdrzavanja = datum;
    this.brojUcesnika = brojUcesnika;
    this.minRejting = minRejting;
    this.maxRejting = maxRejting;
  }
}
