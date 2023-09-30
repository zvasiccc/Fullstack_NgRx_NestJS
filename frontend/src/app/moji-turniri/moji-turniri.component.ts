import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-moji-turniri',
  templateUrl: './moji-turniri.component.html',
  styleUrls: ['./moji-turniri.component.css'],
})
export class MojiTurniriComponent {
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    new Observable();
  mojiTurniri$: Observable<Turnir[]> = this.turnirService.getMojiTurniri(); //new Observable<Turnir[]>(); //observable nad turnirima

  constructor(
    private turnirService: TurnirService,
    private router: Router,
    private store: Store
  ) {
    this.trenutnoPrijavljeniKorisnik$ = this.store
      .select(selectPrijavljeniKorisnik)
      .pipe(map((p: any) => p?.prijavljeniKorisnik));
  }
}
