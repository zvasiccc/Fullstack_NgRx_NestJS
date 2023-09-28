import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Igrac } from 'src/app/shared/models/igrac';
import {
  selectPrijavljeniIgrac,
  selectSviIgraci,
} from 'src/app/shared/state/igrac/igrac.selector';
import { selectPrijavljeniIgraciZaTurnir } from 'src/app/shared/state/turnir/turnir.selector';
import * as PrijavaActions from 'src/app/shared/state/prijava/prijava.actions';
import { selectIgraciUPrijavi } from 'src/app/shared/state/prijava/prijava.selector';
@Injectable({
  providedIn: 'root',
})
export class IgracService {
  constructor(private store: Store, private http: HttpClient) {}
  private sviIgraciUrl = 'http://localhost:3000/igrac/sviIgraci';
  private prijavljeniIgracUrl = 'http://localhost:3000/igrac/prijavljeniIgrac';
  vratiSveIgrace(): Observable<Igrac[]> {
    return this.http.get<Igrac[]>(this.sviIgraciUrl);
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
    return this.http.post(url, igrac).subscribe((p) => p);
  }
}
