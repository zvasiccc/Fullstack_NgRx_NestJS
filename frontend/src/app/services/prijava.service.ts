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
  jwtTokenString: string = '';
  headers: HttpHeaders = new HttpHeaders();
  constructor(private store: Store, private http: HttpClient) {}
  pribaviToken() {
    let jwtTokenObservable = this.store
      .select(selectTokenPrijavljenogKorisnika)
      .pipe(map((p: any) => p.token));

    jwtTokenObservable.subscribe((token: string) => {
      this.jwtTokenString = token;
    });
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtTokenString}`,
    });
  }
  posaljiPrijavuUBazu(prijava: Prijava) {
    this.pribaviToken();
    const url = 'http://localhost:3000/prijava/dodajPrijavu';
    return this.http
      .post(url, prijava, { headers: this.headers })
      .subscribe((p: any) => {
        if (p.porukaGreske == undefined)
          alert('Uspesno ste se prijavili na turnir');
        else alert(p.porukaGreske);
      });
  }
  izbaciIgracaIzTima(igrac: Igrac) {
    this.store.dispatch(PrijavaActions.izbaciIgracaIzTima({ igrac }));
  }
  vratiPrijaveZaTurnir(turnirId: number): Observable<Prijava[]> {
    this.pribaviToken();
    const url = `http://localhost:3000/prijava/prijaveNaTurniru/${turnirId}`;
    return this.http.get<Prijava[]>(url, { headers: this.headers });
  }
  izbaciTimSaTurnira(prijavaId: number): Observable<any> {
    const url = `http://localhost:3000/prijava/izbaciTimSaTurnira/${prijavaId}`;
    return this.http.delete(url);
  }
  odjaviSvojTimSaTurnira(
    turnirId: number,
    igracId: number
  ): Observable<Prijava[]> {
    this.pribaviToken();
    const url = `http://localhost:3000/prijava/odjaviSvojTimSaTurnira/${turnirId}/${igracId}`;
    return this.http.delete<Prijava[]>(url, { headers: this.headers });
  }
}
