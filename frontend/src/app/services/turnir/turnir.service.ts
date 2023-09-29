import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreDevtools } from '@ngrx/store-devtools';
import { Observable, map } from 'rxjs';
import { Igrac } from 'src/app/shared/models/igrac';
import { Turnir } from 'src/app/shared/models/turnir';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  kreirajTurnir,
  vratiSveTurnire,
} from 'src/app/shared/state/turnir/turnir.actions';
import {
  selectPrijavljeniIgraciZaTurnir,
  selectPrijavljeniTurniri,
} from 'src/app/shared/state/turnir/turnir.selector';
import { selectTurnirUPrijavi } from 'src/app/shared/state/prijava/prijava.selector';
import { selectTokenPrijavljenogKorisnika } from 'src/app/shared/state/korisnik/korisnik.selector';

@Injectable({
  providedIn: 'root',
})
export class TurnirService {
  constructor(private store: Store, private http: HttpClient) {}
  //private apiUrl = 'http://localhost:3000/turnir/sviTurniri';

  dodajTurnir(turnir: Turnir) {
    this.store.dispatch(kreirajTurnir({ turnir }));
  }
  // vratiSveTurnire(): Observable<Turnir[]> {
  //   return this.store.select(selectSviTurniri).pipe(map((p: any) => p.turniri));
  // }
  getTurniriBaza(): Observable<Turnir[]> {
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
    const url = 'http://localhost:3000/turnir/sviTurniri';
    return this.http.get<Turnir[]>(url, { headers });
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
  kreirajTurnir(turnir: Turnir) {
    const url = 'http://localhost:3000/turnir/dodajTurnir';
    return this.http.post(url, turnir).subscribe((p) => p);
  }
  async filtrirajTurnire(
    pretragaNaziv: string,
    pretragaMesto: string,
    pretragaPocetniDatum: string,
    pretragaKrajnjiDatum: string,
    pretragaPocetnaNagrada: number,
    pretragaKrajnjaNagrada: number
  ) {
    let params = new HttpParams();
    params = params.append('pretragaNaziv', pretragaNaziv);
    params = params.append('pretragaMesto', pretragaMesto);
    params = params.append('pretragaPocetniDatum', pretragaPocetniDatum);
    params = params.append('pretragaKrajnjiDatum', pretragaKrajnjiDatum);
    params = params.append(
      'pretragaPocetnaNagrada',
      pretragaPocetnaNagrada.toString()
    );
    params = params.append(
      'pretragaKrajnjaNagrada',
      pretragaKrajnjaNagrada.toString()
    );

    // Kreiraj URL sa parametrima
    const url =
      'http://localhost:3000/turnir/filtrirajTurnire' + '?' + params.toString();
    return this.http.get(url);
  }
  async obrisiTurnir(turnirId: number) {
    const url = `http://localhost:3000/turnir/obrisiTurnir/${turnirId}`;
    return this.http.delete(url);
  }
}
