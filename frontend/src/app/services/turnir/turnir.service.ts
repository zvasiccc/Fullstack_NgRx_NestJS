import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreDevtools } from '@ngrx/store-devtools';
import { Observable, map } from 'rxjs';
import { Igrac } from 'src/app/shared/models/igrac';
import { Turnir } from 'src/app/shared/models/turnir';
import { HttpClient } from '@angular/common/http';
import {
  kreirajTurnir,
  vratiSveTurnire,
} from 'src/app/shared/state/turnir/turnir.actions';
import {
  selectPrijavljeniIgraciZaTurnir,
  selectPrijavljeniTurniri,
} from 'src/app/shared/state/turnir/turnir.selector';
import { selectTurnirUPrijavi } from 'src/app/shared/state/prijava/prijava.selector';

@Injectable({
  providedIn: 'root',
})
export class TurnirService {
  constructor(private store: Store, private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/turnir/sviTurniri';

  dodajTurnir(turnir: Turnir) {
    this.store.dispatch(kreirajTurnir({ turnir }));
  }
  // vratiSveTurnire(): Observable<Turnir[]> {
  //   return this.store.select(selectSviTurniri).pipe(map((p: any) => p.turniri));
  // }
  getTurniriBaza(): Observable<Turnir[]> {
    return this.http.get<Turnir[]>(this.apiUrl);
  }
  vratiPrijavljeneIgrace(turnirId: number): Observable<Igrac[]> {
    return this.store
      .select(selectPrijavljeniIgraciZaTurnir(turnirId))
      .pipe(map((p: any) => p.prijavljeniIgraci)); //this.store.select(selectPrijavljeniIgraciZaTurnir, { id: turnirId });
  }
  vratiPrijavljeniTUrnir(): Observable<Turnir> {
    // return this.store
    //   .select(selectPrijavljeniTurniri)
    //   .pipe(map((p: any) => p.prijavljeniTurniri));
    return this.store
      .select(selectTurnirUPrijavi)
      .pipe(map((p: any) => p.turnir));
  }
  kreirajTurnir(turnir: Turnir) {
    const url = 'http://localhost:3000/turnir/dodajTurnir';
    return this.http.post(url, turnir).subscribe((p) => p);
  }
  async filtrirajTurnire(
    pretragaNaziv: string,
    pretragaMesto: string,
    pretragaPocetniDatum: string,
    pretragaKrajnjiDatum: string
  ) {
    const url = `http://localhost:3000/turnir/filtrirajTurnire/${pretragaNaziv}/${pretragaMesto}/${pretragaPocetniDatum}/${pretragaKrajnjiDatum}`;
    return this.http.get(url);
  }
}
