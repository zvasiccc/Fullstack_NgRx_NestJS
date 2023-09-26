import { Component } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kreiranje-turnira',
  templateUrl: './kreiranje-turnira.component.html',
  styleUrls: ['./kreiranje-turnira.component.css'],
})
//TODO  prijavljeni ucenisici, kad se klikne na turnir da izadju prijavljeni ucesnici
//todo i neke informacije, dodaj mogucnost organizatoru da obrise prijavu za tim,vidi prijave na turniru, da vidi svoje turnire, autentifikacija passport js
//da igrac vidi svoje turnire na koje je prijavljen
export class KreiranjeTurniraComponent {
  turnir: Turnir = {
    id: 0,
    naziv: '',
    datumOdrzavanja: '',
    mestoOdrzavanja: '',
    maxBrojUcesnika: 0,
    nagrada: 0,
    prijavljeniIgraci: [],
  };
  constructor(
    private turnirService: TurnirService,
    private _snackBar: MatSnackBar
  ) {}
  // submitForm() {
  //   // Ovde možete dodati logiku za slanje podataka na server ili druge operacije
  //   // Ovde ispisujemo unete podatke na konzoli kao primer
  //   console.log('Podaci o turniru:', this.turnir);
  //   this.turnirService.dodajTurnir(this.turnir);
  //   console.log(this.turnirService.vratiSveTurnire());
  // }
  kreirajTurnir() {
    this.turnirService.kreirajTurnir(this.turnir);
    this.turnir = {
      id: 0,
      naziv: '',
      datumOdrzavanja: '',
      mestoOdrzavanja: '',
      maxBrojUcesnika: 0,
      nagrada: 0,
      prijavljeniIgraci: [],
    };
    this._snackBar.open('Turnir je uspešno kreiran', 'Zatvori', {
      duration: 2000, // Vreme trajanja poruke u milisekundama (2 sekunde u ovom primeru)
    });
  }
}
