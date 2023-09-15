import { Component, Input } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { KorpaService } from '../services/korpa/korpa.service';
import { TurnirService } from '../services/turnir/turnir.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnir',
  templateUrl: './turnir.component.html',
  styleUrls: ['./turnir.component.css'],
})
export class TurnirComponent {
  @Input() turnir: Turnir = new Turnir(0, '', '', 0, 0, 0);
  constructor(
    private korpaService: KorpaService,
    private turnirService: TurnirService,
    private router: Router
  ) {}
  dodajTurnirUKorpu(turnir: Turnir) {
    this.korpaService.dodajTurnirUKorpu(turnir);
  }
  prikaziPrijavljeneIgrace() {
    //this.turnirService.vratiPrijavljeneIgrace(turnirId); //ne trebaa
    this.router.navigateByUrl(`prijavljeniIgraci/${this.turnir.id}`);
  }
}
