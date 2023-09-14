import { Turnir } from './turnir';

export class Igrac {
  id: number;
  ime: string;
  prezime: string;
  rejting: number;
  constructor(id: number, ime: string, prezime: string, rejting: number) {
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.rejting = rejting;
  }
}
