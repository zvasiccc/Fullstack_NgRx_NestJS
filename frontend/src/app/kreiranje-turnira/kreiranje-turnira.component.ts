import { Component } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';

@Component({
  selector: 'app-kreiranje-turnira',
  templateUrl: './kreiranje-turnira.component.html',
  styleUrls: ['./kreiranje-turnira.component.css'],
})
export class KreiranjeTurniraComponent {
  turnir: Turnir = new Turnir(0, '', '', 0, 0, 0);
  constructor(private turnirService: TurnirService) {}
  submitForm() {
    // Ovde možete dodati logiku za slanje podataka na server ili druge operacije
    // Ovde ispisujemo unete podatke na konzoli kao primer
    console.log('Podaci o turniru:', this.turnir);
    this.turnirService.dodajTurnir(this.turnir);
    console.log(this.turnirService.vratiSveTurnire());
  }
}
