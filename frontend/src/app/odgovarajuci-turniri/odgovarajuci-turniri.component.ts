import { Component } from '@angular/core';
import { TurnirService } from '../services/turnir/turnir.service';
import { Observable } from 'rxjs';
import { Turnir } from '../shared/models/turnir';

@Component({
  selector: 'app-odgovarajuci-turniri',
  templateUrl: './odgovarajuci-turniri.component.html',
  styleUrls: ['./odgovarajuci-turniri.component.css'],
})
export class OdgovarajuciTurniriComponent {
  odgovarajuciTurniri$: Observable<Turnir[]> =
    this.turnirService.getTurniriBaza();
  constructor(private turnirService: TurnirService) {}
}
