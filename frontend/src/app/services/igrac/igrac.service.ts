import { HttpClient } from '@angular/common/http';
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
  private prijavljeniIgracUrl = 'http://localhost:3000/igrac/prijavljeniIgrac';
  vratiSveIgrace(): Observable<Igrac[]> {
    const trenutnoPrijavljeniKorisnik$ =
      this.storeService.pribaviTrenutnoPrijavljenogIgraca();
    let idKorisnika: number = 0;
    trenutnoPrijavljeniKorisnik$.subscribe((korisnik) => {
      idKorisnika = korisnik?.id as number;
    });
    const sviIgraciUrl = 'http://localhost:3000/igrac/sviIgraci'; //todo da vraca sve igrace osim trenutnog
    const url = `http://localhost:3000/igrac/vratiSveIgraceOsimTrenutnog/${idKorisnika}`;
    return this.http.get<Igrac[]>(url);
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
    const url = `http://localhost:3000/igrac/korisnickoIme/${korisnickoIme}`;
    return this.http.get<Igrac[]>(url);
  }
  registrujSeKaoIgrac(igrac: Igrac) {
    const url = 'http://localhost:3000/igrac/registrujIgraca';
    return this.http.post(url, igrac).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }
  vidiSaigrace(turnirId: number, igracId: number): Observable<Igrac[]> {
    const headers = this.storeService.pribaviHeaders();
    const url = `http://localhost:3000/igrac/vratiIgraceIzIstogTima/${turnirId}/${igracId}`;
    return this.http.get<Igrac[]>(url, { headers });
  }
  //todo svaki url iz service da se nadovezuje samo
  izmeniPodatkeOIgracu(igrac: Igrac): Observable<Igrac> {
    const headers = this.storeService.pribaviHeaders();
    const url = 'http://localhost:3000/igrac/izmeniPodatkeOIgracu';
    return this.http.put<Igrac>(url, igrac, { headers });
  }
}
