import { Igrac } from './igrac';

export class Turnir {
  id: number;
  naziv: string;
  datumOdrzavanja: string;
  maxBrojUcesnika: number;
  minRejting: number;
  maxRejting: number;
  prijavljeniIgraci: Igrac[] = [];

  constructor(
    id: number,
    naziv: string,
    datum: string,
    maxBrojUcesnika: number,
    minRejting: number,
    maxRejting: number
  ) {
    this.id = id;
    this.naziv = naziv;
    this.datumOdrzavanja = datum;
    this.maxBrojUcesnika = maxBrojUcesnika;
    this.minRejting = minRejting;
    this.maxRejting = maxRejting;
  }
}
