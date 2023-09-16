import { Component, OnInit } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { Observable } from 'rxjs';
//import { KorpaService } from '../services/korpa/korpa.service';
import { IgracService } from '../services/igrac/igrac.service';
import { Igrac } from '../shared/models/igrac';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PrijavaActions from 'src/app/shared/state/prijava/prijava.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sviTurniri$: Observable<Turnir[]> = this.turnirService.getTurniriBaza(); //new Observable<Turnir[]>(); //observable nad turnirima
  // sviIgraci$: Observable<Igrac[]> = this.igracService.vratiSveIgrace();
  constructor(
    private turnirService: TurnirService,
    private igracService: IgracService,
    private router: Router,
    private store: Store
  ) {}
  ngOnInit(): void {}
  prikaziPrijavljeneIgrace() {
    //!ne radi
    //this.turnirService.vratiPrijavljeneIgrace(turnirId); //ne trebaa
    this.router.navigateByUrl(`prijavljeniIgraci`);
  }
  // PrijaviSeNaTurnir(turnir: Turnir) {
  //   this.store.dispatch(TurnirActions.prijaviSeNaTurnir({ turnir }));
  //   this.router.navigateByUrl('sviIgraci');
  // }
  prijaviSeNaTurnir(turnir: Turnir) {
    this.store.dispatch(PrijavaActions.prijaviSeNaTurnir({ turnir }));
    this.router.navigateByUrl('sviIgraci');
  }
}
