import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
// /import { KorpaService } from '../services/korpa/korpa.service';
import { TurnirService } from '../services/turnir/turnir.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as PrijavaActions from 'src/app/shared/state/prijava/prijava.actions';
import * as TurnirActions from 'src/app/shared/state/turnir/turnir.actions';
import { Observable, map } from 'rxjs';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
import { IgracService } from '../services/igrac/igrac.service';
import { PrijavaService } from '../services/prijava.service';
import { StoreService } from '../services/store.service';
import { OrganizatorService } from '../services/organizator.service';
import * as IgracActions from '../shared/state/igrac/igrac.actions';
@Component({
  selector: 'app-turnir',
  templateUrl: './turnir.component.html',
  styleUrls: ['./turnir.component.css'],
})
export class TurnirComponent {
  @Input()
  turnir!: Turnir;
  @Input()
  prikaziDugmice: boolean = true;
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    this.storeService.pribaviTrenutnoPrijavljenogKorisnika();
  jePrijavljenNaTurnir: Observable<any> = new Observable();
  jeOrganizatorTurnira: Observable<any> = new Observable();
  constructor(
    //private korpaService: KorpaService,
    private turnirService: TurnirService,
    private igracService: IgracService,
    private prijavaService: PrijavaService,
    private organizatorService: OrganizatorService,
    private storeService: StoreService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    const idTrenutnogKorisnika =
      this.storeService.pribaviIdPrijavljenogKorisnika();
    this.jePrijavljenNaTurnir = this.igracService.daLiJeIgracPrijavljenNaTurnir(
      this.turnir.id,
      idTrenutnogKorisnika
    );
    this.jeOrganizatorTurnira =
      this.organizatorService.daLiJeOrganizatorTurnira(
        idTrenutnogKorisnika,
        this.turnir.id
      );
  }
  prijaviSeNaTurnir(turnir: Turnir, korisnik: Igrac | Organizator) {
    const igrac: Igrac = korisnik as Igrac;
    //this.store.dispatch(PrijavaActions.prijaviSeNaTurnir({ turnir }));
    this.store.dispatch(
      TurnirActions.setIzabraniTurnir({ turnirId: turnir.id })
    );
    //dodavanje trenutnog korisnika u tim
    this.store.dispatch(IgracActions.dodajIgracaUTim({ igrac }));
    this.router.navigateByUrl('sviIgraci');
  }
  odjaviSvojTimSaTurnira(turnirId: number, igracId: number) {
    this.prijavaService
      .odjaviSvojTimSaTurnira(turnirId, igracId)
      .subscribe(() => alert('uspesno ste odjavili turnir'));
  }
  async prikaziPrijavljeneTimove(turnirId: number) {
    this.router.navigateByUrl(`prijavljeniTimovi/${turnirId}`);
  }

  async vidiSaigrace(turnirId: number, igracId: number) {
    this.router.navigateByUrl(`mojiSaigraci/${turnirId}/${igracId}`);
  }

  async obrisiTurnir() {
    (await this.turnirService.obrisiTurnir(this.turnir.id)).subscribe((p) => {
      this.turnirService.refresh();
    });
  }

  igracJeVodja(user: any): user is Igrac {
    return user.role === 'igrac' && user.vodjaTima === true;
  }
}
