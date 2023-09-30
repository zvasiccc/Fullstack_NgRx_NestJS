import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { IgracService } from '../services/igrac/igrac.service';
import { OrganizatorService } from '../services/organizator.service';
import { mergeMap, of } from 'rxjs';
import { Igrac } from '../shared/models/igrac';
import { Store } from '@ngrx/store';
import * as IgracActions from '../shared/state/igrac/igrac.actions';
import { Organizator } from '../shared/models/organizator';
import * as KorisnikActions from '../shared/state/korisnik/korisnik.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  prijavljeniKorisnik: Igrac | Organizator | undefined;
  korisnickoIme: string = '';
  lozinka: string = '';
  // isIgrac: boolean = false; // Initialize to false
  // isOrganizator: boolean = false; // Initialize to false
  // prijavljen: boolean = false;
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private store: Store,
    private igracService: IgracService,
    private organizatorService: OrganizatorService,
    private router: Router
  ) {}

  async prijaviSe() {
    const tokenObservable = this.loginService.posaljiZahtevZaLogin(
      this.korisnickoIme,
      this.lozinka
    );
    let jwtToken: any;
    tokenObservable.subscribe(async (token: any) => {
      jwtToken = token.access_token;
      let korisnik: Igrac | Organizator | undefined = token.korisnik;
      console.log(korisnik);
      if (korisnik) {
        this.prijavljeniKorisnik =
          korisnik.role == 'igrac'
            ? (korisnik as Igrac)
            : (korisnik as Organizator);
      }
      if (this.prijavljeniKorisnik) {
        this.store.dispatch(
          KorisnikActions.postaviPrijavljenogKorisnika({
            prijavljeniKorisnik: this.prijavljeniKorisnik,
          })
        );
        this.store.dispatch(
          KorisnikActions.postaviTokenPrijavljenogKorisnika({
            token: jwtToken,
          })
        );
      }
      this.router.navigateByUrl('');
    });
  }
}
