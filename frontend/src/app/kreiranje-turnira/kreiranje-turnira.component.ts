import { Component } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kreiranje-turnira',
  templateUrl: './kreiranje-turnira.component.html',
  styleUrls: ['./kreiranje-turnira.component.css'],
})
//todo za svaku funkciju staviti dekorator na back, dosadasnje fje na front da mogu da pozivaju samo ko treba
//todo pregledaj moj tim ako si prijavljen na turnir
//todo popravi brisanje sa jeOrganizator turnira ono u subscribe
//todo napravi fju za vbracanje svih igraca koji nisu prijavljeni na turnir
//todo doradi profil malo
export class KreiranjeTurniraComponent {
  turnir: Turnir = {
    id: 0,
    naziv: '',
    datumOdrzavanja: '',
    mestoOdrzavanja: '',
    maxBrojTimova: 0,
    trenutniBrojTimova: 0,
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
      maxBrojTimova: 0,
      trenutniBrojTimova: 0,
      nagrada: 0,
      prijavljeniIgraci: [],
    };
    this._snackBar.open('Turnir je uspešno kreiran', 'Zatvori', {
      duration: 2000,
    });
  }
}
