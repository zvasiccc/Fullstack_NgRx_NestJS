import { Component, Input } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { KorpaService } from '../services/korpa/korpa.service';

@Component({
  selector: 'app-turnir',
  templateUrl: './turnir.component.html',
  styleUrls: ['./turnir.component.css'],
})
export class TurnirComponent {
  @Input() turnir: Turnir = new Turnir(0, '', '', 0);
  constructor(private korpaService: KorpaService) {}
  dodajTurnirUKorpu(turnir: Turnir) {
    this.korpaService.dodajTurnirUKorpu(turnir);
  }
}
