import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as KorisnikActions from '../shared/state/korisnik/korisnik.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private store: Store) {}
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
    this.router.navigateByUrl('');
  }
  navigirajNaPrijavu() {
    this.router.navigateByUrl('prijava');
  }
  navigirajNaRegistraciju() {
    this.router.navigateByUrl('registracija');
  }
  // navigirajNaBiranjeIgraca() {
  //   this.router.navigateByUrl('sviIgraci');
  // }
  // izaberiPreference() {
  //   this.router.navigateByUrl('preference');
  // }
}
