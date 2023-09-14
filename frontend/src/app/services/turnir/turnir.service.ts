import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreDevtools } from '@ngrx/store-devtools';
import { Observable, map } from 'rxjs';
import { Turnir } from 'src/app/shared/models/turnir';
import {
  kreirajTurnir,
  vratiSveTurnire,
} from 'src/app/shared/state/turnir/turnir.actions';
import { selectSviTurniri } from 'src/app/shared/state/turnir/turnir.selector';

@Injectable({
  providedIn: 'root',
})
export class TurnirService {
  constructor(private store: Store) {}
  dodajTurnir(turnir: Turnir) {
    this.store.dispatch(kreirajTurnir({ turnir }));
  }
  vratiSveTurnire(): Observable<Turnir[]> {
    return this.store.select(selectSviTurniri).pipe(map((p: any) => p.turniri));
  }
}
