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
import * as OrgnizatorActions from '../shared/state/organizator/organizator.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  prijavljeniIgrac: Igrac | undefined;
  prijavljeniOrganizator: Organizator | undefined;
  korisnickoIme: string = '';
  lozinka: string = '';
  isIgrac: boolean = false; // Initialize to false
  isOrganizator: boolean = false; // Initialize to false
  prijavljen: boolean = false;
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private store: Store,
    private igracService: IgracService,
    private organizatorService: OrganizatorService,
    private router: Router
  ) {}
  //todo da se sa backa vraca token i korisnik
  //todo treba mi samo jedan store za korisnika, u njega cuvam korisnika i token
  //todo da nema psoebnih za orgazniatroa i igraca, sve je korisnik i na osnovu korosink.role mrckam
  //todo nema vise radio buton, postavljam korisnika u store
  async prijaviSe() {
    const tokenObservable = this.loginService.posaljiZahtevZaLogin(
      this.korisnickoIme,
      this.lozinka
    );
    let jwtToken: any;
    tokenObservable.subscribe(async (token: any) => {
      jwtToken = token.access_token;
      console.log(jwtToken);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`,
      });
      if (this.isIgrac) {
        const url = 'http://localhost:3000/igrac/vratiIgracaIzTokena';
        const response: any = await this.http.get(url, { headers }).toPromise();
        this.prijavljeniIgrac = response;
        console.log(this.prijavljeniIgrac);
        this.store.dispatch(
          IgracActions.postaviPrijavljenogIgraca({
            prijavljeniIgrac: this.prijavljeniIgrac as Igrac, //todo postavljam ga kao igrac ako je korisnik.role
          })
        );
        this.prijavljen = true;
        this.router.navigateByUrl('');
      }
      if (this.isOrganizator) {
        const url =
          'http://localhost:3000/organizator/vratiOrganizatoraIzTokena';
        const response: any = await this.http.get(url, { headers }).toPromise();
        this.prijavljeniOrganizator = response;
        console.log(this.prijavljeniOrganizator);
        this.store.dispatch(
          OrgnizatorActions.postaviPrijavljenogOrganizatora({
            prijavljeniOrganizator: this.prijavljeniOrganizator as Organizator,
          })
        );
        this.prijavljen = true;
        this.router.navigateByUrl('');
      }
    });
  }
}
