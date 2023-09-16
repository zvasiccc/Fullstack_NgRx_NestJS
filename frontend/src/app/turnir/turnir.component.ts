import { Component, Input } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
// /import { KorpaService } from '../services/korpa/korpa.service';
import { TurnirService } from '../services/turnir/turnir.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TurnirActions from 'src/app/shared/state/turnir/turnir.actions';
import * as PrijavaActions from 'src/app/shared/state/prijava/prijava.actions';
@Component({
  selector: 'app-turnir',
  templateUrl: './turnir.component.html',
  styleUrls: ['./turnir.component.css'],
})
export class TurnirComponent {
  @Input()
  turnir!: Turnir;
  constructor(
    //private korpaService: KorpaService,
    private turnirService: TurnirService,
    private store: Store,
    private router: Router
  ) {}
  // dodajTurnirUKorpu(turnir: Turnir) {
  //   this.korpaService.dodajTurnirUKorpu(turnir);
  // }
}
