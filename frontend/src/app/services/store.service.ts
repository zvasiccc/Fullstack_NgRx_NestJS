import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  selectPrijavljeniKorisnik,
  selectTokenPrijavljenogKorisnika,
} from '../shared/state/korisnik/korisnik.selector';
import { Store } from '@ngrx/store';
import { Igrac } from '../shared/models/igrac';
import { Turnir } from '../shared/models/turnir';
import { selectTurnirUPrijavi } from '../shared/state/prijava/prijava.selector';
import { Organizator } from '../shared/models/organizator';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  jwtTokenString: string = '';
  headers: HttpHeaders = new HttpHeaders();
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    new Observable();
  prijavljeniKorisnikId: number = 0;
  constructor(private store: Store) {
    this.trenutnoPrijavljeniKorisnik$ = this.store
      .select(selectPrijavljeniKorisnik)
      .pipe(map((p: any) => p?.prijavljeniKorisnik));
  }
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
  public pribaviTrenutnoPrijavljenogKorisnika() {
    return this.trenutnoPrijavljeniKorisnik$;
  }
  public pribaviIdPrijavljenogKorisnika(): number {
    this.trenutnoPrijavljeniKorisnik$.subscribe((p) => {
      this.prijavljeniKorisnikId = p?.id as number;
    });
    return this.prijavljeniKorisnikId;
  }
  vratiPrijavljeneIgrace(turnirId: number): Observable<Igrac[]> {
    return this.store
      .select(selectPrijavljeniIgraciZaTurnir)
      .pipe(map((p: any) => p.prijavljeniIgraci)); //this.store.select(selectPrijavljeniIgraciZaTurnir, { id: turnirId });
  }
  vratiPrijavljeniTUrnir(): Observable<Turnir> {
    return this.store.select(selectTurnirUPrijavi);
    //.pipe(map((p: any) => p.turnir));
    // return this.store
    //   .select(selectPrijavljeniTurniri)
    //   .pipe(map((p: any) => p.prijavljeniTurniri));
  }
}
function selectPrijavljeniIgraciZaTurnir(state: object): unknown {
  throw new Error('Function not implemented.');
}
