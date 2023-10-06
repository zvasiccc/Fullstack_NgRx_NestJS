import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnirService } from '../services/turnir/turnir.service';
import { Turnir } from '../shared/models/turnir';
//import { KorpaService } from '../services/korpa/korpa.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IgracService } from '../services/igrac/igrac.service';
import { StoreService } from '../services/store.service';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';
import { selectSviTurniri } from '../shared/state/turnir/turnir.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sviTurniri$: Observable<Turnir[]> = this.turnirService.getTurniriBaza();
  filtriraniTurniri: Turnir[] = [];
  turniriStore$: Observable<Turnir[]> = this.store.select(selectSviTurniri);
  postojeFiltriraniTurniri: boolean = false;
  pretragaIzvrsena: boolean = false;
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    this.storeService.pribaviTrenutnoPrijavljenogKorisnika();
  constructor(
    private turnirService: TurnirService,
    private igracService: IgracService,
    private storeService: StoreService,
    private router: Router,
    private store: Store
  ) {}
  ngOnInit(): void {}

  handlePretragaRezultati(rezultati: Turnir[]) {
    console.log('Rezultati pretrage:', rezultati);
    this.filtriraniTurniri = rezultati;
    this.postojeFiltriraniTurniri =
      this.filtriraniTurniri && this.filtriraniTurniri.length > 0;
    this.pretragaIzvrsena = true;
  }
}
