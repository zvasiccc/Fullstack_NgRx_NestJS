import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { selectTokenPrijavljenogKorisnika } from '../shared/state/korisnik/korisnik.selector';
import { Store } from '@ngrx/store';
import { selectPrijavljeniIgraciZaTurnir } from '../shared/state/turnir/turnir.selector';
import { Igrac } from '../shared/models/igrac';
import { Turnir } from '../shared/models/turnir';
import { selectTurnirUPrijavi } from '../shared/state/prijava/prijava.selector';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  jwtTokenString: string = '';
  headers: HttpHeaders = new HttpHeaders();
  constructor(private store: Store) {}
  public pribaviHeaders(): HttpHeaders {
    let jwtTokenObservable = this.store
      .select(selectTokenPrijavljenogKorisnika)
      .pipe(map((p: any) => p.token));

    jwtTokenObservable.subscribe((token: string) => {
      this.jwtTokenString = token;
    });
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtTokenString}`,
    });
    return this.headers;
  }
  vratiPrijavljeneIgrace(turnirId: number): Observable<Igrac[]> {
    return this.store
      .select(selectPrijavljeniIgraciZaTurnir(turnirId))
      .pipe(map((p: any) => p.prijavljeniIgraci)); //this.store.select(selectPrijavljeniIgraciZaTurnir, { id: turnirId });
  }
  vratiPrijavljeniTUrnir(): Observable<Turnir> {
    return this.store
      .select(selectTurnirUPrijavi)
      .pipe(map((p: any) => p.turnir));
    // return this.store
    //   .select(selectPrijavljeniTurniri)
    //   .pipe(map((p: any) => p.prijavljeniTurniri));
  }
}
