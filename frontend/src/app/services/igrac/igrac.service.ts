import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Igrac } from 'src/app/shared/models/igrac';
import { selectSviIgraci } from 'src/app/shared/state/igrac/igrac.selector';
import { selectPrijavljeniIgraciZaTurnir } from 'src/app/shared/state/turnir/turnir.selector';
import * as PrijavaActions from 'src/app/shared/state/prijava/prijava.actions';
import { selectIgraciUPrijavi } from 'src/app/shared/state/prijava/prijava.selector';
import { StoreService } from '../store.service';
import { Route, Router } from '@angular/router';
import { Organizator } from 'src/app/shared/models/organizator';
import { selectPrijavljeniKorisnik } from 'src/app/shared/state/korisnik/korisnik.selector';
@Injectable({
  providedIn: 'root',
})
export class IgracService {
  constructor(
    private store: Store,
    private http: HttpClient,
    private storeService: StoreService,
    private router: Router
  ) {}
  //private prijavljeniIgracUrl = 'http://localhost:3000/igrac/prijavljeniIgrac';
  private urlIgrac = 'http://localhost:3000/igrac/';
  vratiSveIgrace(): Observable<Igrac[]> {
    const trenutnoPrijavljeniKorisnik$ =
      this.storeService.pribaviTrenutnoPrijavljenogKorisnika();
    let idKorisnika: number = 0;
    trenutnoPrijavljeniKorisnik$.subscribe((korisnik) => {
      idKorisnika = korisnik?.id as number;
    });
    const url: string =
      this.urlIgrac + `vratiSveIgraceOsimTrenutnog/${idKorisnika}`;
    const headers: HttpHeaders = this.storeService.pribaviHeaders();
    return this.http.get<Igrac[]>(url, { headers });
  }
  // vratiPrijavljenogIgraca() {
  //   // return this.http.get<Igrac>(this.prijavljeniIgracUrl);
  //   return this.store
  //     .select(selectPrijavljeniIgrac)

  // }
  dodajIgracaUTim(igrac: Igrac) {
    return this.store.dispatch(PrijavaActions.dodajIgracaUTim({ igrac }));
  }
  vratiIgraceIzTima() {
    return this.store
      .select(selectIgraciUPrijavi)
      .pipe(map((p: any) => p.igraciUTimu));
  }
  vratiIgracePoKorisnickomImenu(korisnickoIme: string): Observable<Igrac[]> {
    const url = this.urlIgrac + `korisnickoIme/${korisnickoIme}`;
    const headers = this.storeService.pribaviHeaders();
    return this.http.get<Igrac[]>(url, { headers });
  }
  registrujSeKaoIgrac(igrac: Igrac) {
    const url = this.urlIgrac + 'registrujIgraca';
    return this.http.post(url, igrac).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }
  vidiSaigrace(turnirId: number, igracId: number): Observable<Igrac[]> {
    const headers = this.storeService.pribaviHeaders();
    const url = this.urlIgrac + `vratiIgraceIzIstogTima/${turnirId}/${igracId}`;
    return this.http.get<Igrac[]>(url, { headers });
  }

  izmeniPodatkeOIgracu(igrac: Igrac): Observable<Igrac> {
    const headers = this.storeService.pribaviHeaders();
    const url = this.urlIgrac + 'izmeniPodatkeOIgracu';
    return this.http.put<Igrac>(url, igrac, { headers });
  }
}
