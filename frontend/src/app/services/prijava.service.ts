import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Prijava } from '../shared/models/prijava';
import { Igrac } from '../shared/models/igrac';
import * as PrijavaActions from '../shared/state/prijava/prijava.actions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrijavaService {
  constructor(private store: Store, private http: HttpClient) {}
  posaljiPrijavuUBazu(prijava: Prijava) {
    const url = 'http://localhost:3000/prijava/dodajPrijavu';
    return this.http.post(url, prijava).subscribe((p) => {
      p;
    });
  }
  izbaciIgracaIzTima(igrac: Igrac) {
    this.store.dispatch(PrijavaActions.izbaciIgracaIzTima({ igrac }));
  }
  vratiPrijaveZaTurnir(turnirId: number): Observable<Prijava[]> {
    const url = `http://localhost:3000/prijava/prijaveNaTurniru/${turnirId}`;
    return this.http.get<Prijava[]>(url);
  }
  izbaciTimSaTurnira(prijavaId: number) {
    const url = `http://localhost:3000/prijava/izbaciTimSaTurnira/${prijavaId}`;
    return this.http.delete(url).subscribe((p) => p);
  }
}
