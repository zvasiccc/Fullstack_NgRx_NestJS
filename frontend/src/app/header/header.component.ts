import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IgracService } from '../services/igrac/igrac.service';
import { StoreService } from '../services/store.service';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';
import * as KorisnikActions from '../shared/state/korisnik/korisnik.actions';
import * as PrijavaActions from '../shared/state/prijava/prijava.actions';
import * as IgracActions from '../shared/state/igrac/igrac.actions';
import { IgraciNaTurniruComponent } from '../igraci-na-turniru/igraci-na-turniru.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    this.storeService.pribaviTrenutnoPrijavljenogKorisnika();
  constructor(
    private igracService: IgracService,
    private router: Router,
    private store: Store,
    private storeService: StoreService
  ) {}

  navigirajNaKreiranjeTurnira() {
    this.router.navigateByUrl('kreiranjeTurnira');
  }
  navigirajNaPocetnu() {
    this.router.navigateByUrl('');
  }
  navigirajNaProfil() {
    this.router.navigateByUrl('profil');
  }
  navigirajNaLogin() {
    this.router.navigateByUrl('login');
  }
  OdjaviSe() {
    this.store.dispatch(KorisnikActions.odjaviPrijavljenogKorisnika());
    this.store.dispatch(PrijavaActions.OcistiStore());
    this.store.dispatch(IgracActions.ocistiStore());
    this.router.navigateByUrl('');
  }
  navigirajNaPrijavu() {
    this.router.navigateByUrl('prijava');
  }
  navigirajNaRegistraciju() {
    this.router.navigateByUrl('registracija');
  }
  navigirajNaMojeTurnire() {
    this.router.navigateByUrl('mojiTurniri');
  }
}
