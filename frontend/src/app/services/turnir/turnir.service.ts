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
  selectSviTurniri,
} from 'src/app/shared/state/turnir/turnir.selector';

@Injectable({
  providedIn: 'root',
})
export class TurnirService {
  constructor(private store: Store, private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/turnir/sviTurniri';

  dodajTurnir(turnir: Turnir) {
    this.store.dispatch(kreirajTurnir({ turnir }));
  }
  vratiSveTurnire(): Observable<Turnir[]> {
    return this.store.select(selectSviTurniri).pipe(map((p: any) => p.turniri));
  }
  getTurniriBaza(): Observable<Turnir[]> {
    return this.http.get<Turnir[]>(this.apiUrl);
  }
  vratiPrijavljeneIgrace(turnirId: number): Observable<Igrac[]> {
    return this.store.select(selectPrijavljeniIgraciZaTurnir(turnirId)); //this.store.select(selectPrijavljeniIgraciZaTurnir, { id: turnirId });
  }
}
// Gde je komponenta koja poziva servt
