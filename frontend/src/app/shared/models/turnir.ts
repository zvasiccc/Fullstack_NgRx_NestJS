import { Igrac } from './igrac';

export interface Turnir {
  id: number;
  naziv: string;
  datumOdrzavanja: string;
  mestoOdrzavanja: string;
  maxBrojUcesnika: number;
  prijavljeniIgraci: Igrac[];

  // constructor(
  //   id: number,
  //   naziv: string,
  //   datum: string,
  //   mestoOdrzavanja: string,
  //   maxBrojUcesnika: number
  // ) {
  //   this.id = id;
  //   this.naziv = naziv;
  //   this.datumOdrzavanja = datum;
  //   this.mestoOdrzavanja = mestoOdrzavanja;
  //   this.maxBrojUcesnika = maxBrojUcesnika;
  // }
}
