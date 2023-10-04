import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Prijava } from '../shared/models/prijava';
import { Igrac } from '../shared/models/igrac';
import * as PrijavaActions from '../shared/state/prijava/prijava.actions';
import { Observable, map } from 'rxjs';
import { selectTokenPrijavljenogKorisnika } from '../shared/state/korisnik/korisnik.selector';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class PrijavaService {
  constructor(
    private store: Store,
    private http: HttpClient,
    private storeService: StoreService
  ) {}
  prijavaUrl = 'http://localhost:3000/prijava/';
  posaljiPrijavuUBazu(prijava: Prijava) {
    const headers = this.storeService.pribaviHeaders(); //todo da li je bolje headers van fje

    const url = this.prijavaUrl + 'dodajPrijavu';
    return this.http.post(url, prijava, { headers }).subscribe((p: any) => {
      if (p.porukaGreske == undefined)
        alert('Uspesno ste se prijavili na turnir');
      else alert(p.porukaGreske);
    });
  }
  izbaciIgracaIzTima(igrac: Igrac) {
    this.store.dispatch(PrijavaActions.izbaciIgracaIzTima({ igrac }));
  }
  vratiPrijaveZaTurnir(turnirId: number): Observable<Prijava[]> {
    const headers = this.storeService.pribaviHeaders();
    const url = this.prijavaUrl + `prijaveNaTurniru/${turnirId}`;
    return this.http.get<Prijava[]>(url, { headers });
  }
  izbaciTimSaTurnira(prijavaId: number): Observable<any> {
    const url = this.prijavaUrl + `izbaciTimSaTurnira/${prijavaId}`;
    return this.http.delete(url);
  }
  odjaviSvojTimSaTurnira(
    turnirId: number,
    igracId: number
  ): Observable<Prijava[]> {
    const headers = this.storeService.pribaviHeaders();
    const url =
      this.prijavaUrl + `odjaviSvojTimSaTurnira/${turnirId}/${igracId}`;
    return this.http.delete<Prijava[]>(url, { headers });
  }
}
