import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent {
  prijavljeniTurnir: Observable<Turnir> =
    this.turnirService.vratiPrijavljeniTUrnir();
  constructor(private turnirService: TurnirService) {}
}
