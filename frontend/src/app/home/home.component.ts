import { Component, OnInit } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { Observable, map } from 'rxjs';
//import { KorpaService } from '../services/korpa/korpa.service';
import { IgracService } from '../services/igrac/igrac.service';
import { Igrac } from '../shared/models/igrac';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PrijavaActions from 'src/app/shared/state/prijava/prijava.actions';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
import { Organizator } from '../shared/models/organizator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sviTurniri$: Observable<Turnir[]> = this.turnirService.getTurniriBaza(); //new Observable<Turnir[]>(); //observable nad turnirima
  // sviIgraci$: Observable<Igrac[]> = this.igracService.vratiSveIgrace();
  //filtriraniTurniri$: Observable<Turnir[]> = new Observable();
  filtriraniTurniri: Turnir[] = [];
  postojeFiltriraniTurniri: boolean = false;
  pretragaIzvrsena: boolean = false;
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    new Observable();
  constructor(
    private turnirService: TurnirService,
    private igracService: IgracService,
    private router: Router,
    private store: Store
  ) {
    this.trenutnoPrijavljeniKorisnik$ = this.store
      .select(selectPrijavljeniKorisnik)
      .pipe(map((p: any) => p?.prijavljeniKorisnik));
  }
  ngOnInit(): void {}

  handlePretragaRezultati(rezultati: Turnir[]) {
    // Ovde možete obraditi rezultate koji su emitovani iz SearchBarComponent
    console.log('Rezultati pretrage:', rezultati);
    this.filtriraniTurniri = rezultati;
    this.postojeFiltriraniTurniri =
      this.filtriraniTurniri && this.filtriraniTurniri.length > 0;
    this.pretragaIzvrsena = true;
  }
  // prikaziPrijavljeneIgrace(turnir: Turnir) {
  //   //!ne radi
  //   //this.turnirService.vratiPrijavljeneIgrace(turnirId); //ne trebaa
  //   this.router.navigateByUrl(`prijavljeniIgraci/${turnir.id}`);
  // }
  prijaviSeNaTurnir(turnir: Turnir) {
    this.store.dispatch(PrijavaActions.prijaviSeNaTurnir({ turnir }));
    this.router.navigateByUrl('sviIgraci');
  }
  async obrisiTurnir(turnirId: number) {
    (await this.turnirService.obrisiTurnir(turnirId)).subscribe(() => {
      this.filtriraniTurniri = this.filtriraniTurniri.filter(
        (turnir) => turnir.id !== turnirId
      );
      this.sviTurniri$ = this.turnirService.getTurniriBaza(); //todo obrisati kasnije
    });
  }
  async prikaziPrijavljeneTimove(turnirId: number) {
    this.router.navigateByUrl(`prijavljeniTimovi/${turnirId}`);
  }
}
