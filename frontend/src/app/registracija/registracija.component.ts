import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css'],
})
export class RegistracijaComponent {
  tipRegistracije: 'igrac' | 'organizator' = 'igrac';
  igrac: Igrac = {
    id: 0,
    korisnickoIme: '',
    ime: '',
    prezime: '',
    vodjaTima: false,
  };
  organizator: Organizator = {
    id: 0,
    korisnickoIme: '',
    lozinka: '',
  };
  constructor() {}

  registrujSe() {
    console.log(this.igrac);
    console.log(this.organizator);
    this.igrac = {
      id: 0,
      korisnickoIme: '',
      ime: '',
      prezime: '',
      vodjaTima: false,
    };
    this.organizator = {
      id: 0,
      korisnickoIme: '',
      lozinka: '',
    };
  }
}
