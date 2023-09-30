import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Prijava } from '../shared/models/prijava';
import { Igrac } from '../shared/models/igrac';
import * as PrijavaActions from '../shared/state/prijava/prijava.actions';
import { Observable, map } from 'rxjs';
import { selectTokenPrijavljenogKorisnika } from '../shared/state/korisnik/korisnik.selector';

@Injectable({
  providedIn: 'root',
})
export class PrijavaService {
  constructor(private store: Store, private http: HttpClient) {}
  posaljiPrijavuUBazu(prijava: Prijava) {
    let jwtTokenObservable = this.store
      .select(selectTokenPrijavljenogKorisnika)
      .pipe(map((p: any) => p.token));
    let jwtTokenString: string = 'mrk';
    jwtTokenObservable.subscribe((token: string) => {
      jwtTokenString = token;
    });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtTokenString}`,
    });
    const url = 'http://localhost:3000/prijava/dodajPrijavu';
    return this.http.post(url, prijava, { headers }).subscribe((p) => {
      if (p == null) alert('nema mesta na turniru');
    });
  }
  izbaciIgracaIzTima(igrac: Igrac) {
    this.store.dispatch(PrijavaActions.izbaciIgracaIzTima({ igrac }));
  }
  vratiPrijaveZaTurnir(turnirId: number): Observable<Prijava[]> {
    const url = `http://localhost:3000/prijava/prijaveNaTurniru/${turnirId}`;
    return this.http.get<Prijava[]>(url);
  }
  izbaciTimSaTurnira(prijavaId: number): Observable<any> {
    const url = `http://localhost:3000/prijava/izbaciTimSaTurnira/${prijavaId}`;
    return this.http.delete(url);
  }
}
